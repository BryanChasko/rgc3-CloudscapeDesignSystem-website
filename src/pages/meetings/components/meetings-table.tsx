// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { ReactNode, useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import CollectionPreferences, {
  CollectionPreferencesProps,
} from '@cloudscape-design/components/collection-preferences';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import Table, { TableProps } from '@cloudscape-design/components/table';

import { meeting } from '../data';
import { TextFilter } from '@cloudscape-design/components';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';

const getFilterCounterText = (count = 0) => `${count} ${count === 1 ? 'match' : 'matches'}`;
const getHeaderCounterText = (items: readonly meeting[] = [], selectedItems: readonly meeting[] = []) => {
  return selectedItems && selectedItems.length > 0 ? `(${selectedItems.length}/${items.length})` : `(${items.length})`;
};

const columnDefinitions: TableProps<meeting>['columnDefinitions'] = [
  {
    header: 'Meetup Title',
    cell: ({ name }) => name,
    sortingField: 'name',
    minWidth: 175,
  },
  {
    header: 'Presenters',
    cell: ({ presenters }) => presenters,
    sortingField: 'presenters',
    minWidth: 160,
  },
  {
    header: 'Happened?',
    cell: ({ happened }) => happened,
    sortingField: 'happened',
    minWidth: 90,
  },
  {
    header: 'On-Demand',
    cell: ({ ondemand }) => ondemand,
    sortingField: 'ondemand',
    minWidth: 140,
  },
  {
    header: 'Event Page',
    cell: ({ eventlink }) => eventlink,
    sortingField: 'eventlink',
    minWidth: 160,
  }
];

const EmptyState = ({ title, subtitle, action }: { title: string; subtitle: string; action: ReactNode }) => {
  return (
    <Box textAlign="center" color="inherit">
      <Box variant="strong" textAlign="center" color="inherit">
        {title}
      </Box>
      <Box variant="p" padding={{ bottom: 's' }} color="inherit">
        {subtitle}
      </Box>
      {action}
    </Box>
  );
};

export interface VariationTableProps {
  meetings: meeting[];
}

export default function VariationTable({ meetings }: VariationTableProps) {
  const [preferences, setPreferences] = useState<CollectionPreferencesProps['preferences']>({ pageSize: 20 });
  const { items, filterProps, actions, filteredItemsCount, paginationProps, collectionProps } = useCollection<meeting>(
    meetings,
    {
      filtering: {
        noMatch: (
          <EmptyState
            title="No matches"
            subtitle="We can’t find a match."
            action={<Button onClick={() => actions.setFiltering('')}>Clear filter</Button>}
          />
        ),
        empty: (
          <EmptyState title="No meetings" subtitle="No meetings to display." action={<Button>Create meeting</Button>} />
        ),
      },
      pagination: { pageSize: preferences?.pageSize },
      sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
      selection: {},
    }
  );

  return (
    <Table<meeting>
      {...collectionProps}
      enableKeyboardNavigation={false}
      items={items}
      columnDefinitions={columnDefinitions}
      stickyHeader={true}
      resizableColumns={true}
      variant="full-page"
      //selectionType="single"
      ariaLabels={{
        selectionGroupLabel: 'Items selection',
        itemSelectionLabel: ({ selectedItems }, item) => {
          const isItemSelected = selectedItems.filter(i => i.name === item.name).length;
          return `${item.name} is ${isItemSelected ? '' : 'not '}selected`;
        },
        tableLabel: 'meetings table',
      }}
      header={
        <Header
          variant="awsui-h1-sticky"
          counter={getHeaderCounterText(meetings, collectionProps.selectedItems)}
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button disabled={collectionProps.selectedItems?.length === 0}>Edit</Button>
              <Button disabled={collectionProps.selectedItems?.length === 0} href="/create-meeting/index.html" variant="primary">
                Create meeting
              </Button>
            </SpaceBetween>
          }
        >
          meetings
        </Header>
      }
      pagination={<Pagination {...paginationProps} />}
      filter={
        <TextFilter
          {...filterProps}
          filteringPlaceholder="Find meetings"
          countText={getFilterCounterText(filteredItemsCount)}
        />
      }
      preferences={
        <CollectionPreferences
          preferences={preferences}
          pageSizePreference={{
            title: 'Select page size',
            options: [
              { value: 10, label: '10 resources' },
              { value: 20, label: '20 resources' },
              { value: 50, label: '50 resources' },
              { value: 100, label: '100 resources' },
            ],
          }}
          onConfirm={({ detail }) => setPreferences(detail)}
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
        />
      }
    />
  );
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Modal from '@cloudscape-design/components/modal';
import Table, { TableProps } from '@cloudscape-design/components/table';

const columnDefinitions: TableProps['columnDefinitions'] = [
  { header: 'Name', cell: ({ name }) => name },
  { header: 'Strong', cell: ({ strong }) => strong },
  { header: 'Mild', cell: ({ mild }) => mild },
  { header: 'Unnoticed', cell: ({ unnoticed }) => unnoticed },
];

export interface QualityReportProps {
  quote: string;
  notes: TableProps['items'];
}

export default function QualityReport({ quote, notes }: QualityReportProps) {
  const [showTastingNotes, setShowTastingNotes] = useState(false);

  return (
    <Container header={<Header variant="h2">#AWSelfTaught User Group</Header>}>
      <Box variant="p">Rio Grande Cloud Corridor (RGC3):</Box>
      <Box color="text-body-secondary">{quote}</Box>
      {/* <Button variant="normal" onClick={() => setShowTastingNotes(true)}>
        About Services Discussed
      </Button> */}
      {showTastingNotes ? (
        <Modal visible={true} onDismiss={() => setShowTastingNotes(false)} header="Group notes">
          <Table
            sortingColumn={columnDefinitions[0]}
            enableKeyboardNavigation={true}
            items={notes}
            columnDefinitions={columnDefinitions}
          />
        </Modal>
      ) : null}
    </Container>
  );
}

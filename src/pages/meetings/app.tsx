// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { HelpPanelHome } from '../create-meeting/components/help-panel-home';

import Breadcrumbs from '../../components/breadcrumbs';
import Navigation from '../../components/navigation';
import ShellLayout from '../../layouts/shell';
import VariationsTable from './components/meetings-table';

import { variationsData } from './data';

export default function App() {
  return (
    <ShellLayout
      contentType="table"
      breadcrumbs={<Breadcrumbs active={{ text: 'Meetings', href: '/meetings/index.html' }} />}
      navigation={<Navigation />}
      tools={<HelpPanelHome />}
    >
      <VariationsTable meetings={variationsData} />
    </ShellLayout>
  );
}

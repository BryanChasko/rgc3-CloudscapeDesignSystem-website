// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { useState } from 'react';
import Container from '@cloudscape-design/components/container';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Tiles from '@cloudscape-design/components/tiles';

export default function Shape() {
  const [shape, setShape] = useState('bar');

  return (
    <Container header={<Header variant="h2">Meeting Type</Header>}>
      <FormField label="Shape" stretch={true}>
        <Tiles
          items={[
            {
              value: 'virtual',
              label: 'Virtual',
              description: 'Virtual Only Meetups',
            },
            {
              value: 'inperson',
              label: 'In-Person',
              description: 'In person hosted events, including hybrid',
            },
          ]}
          value={shape}
          onChange={e => setShape(e.detail.value)}
        />
      </FormField>
    </Container>
  );
}

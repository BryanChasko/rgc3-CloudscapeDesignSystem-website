// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Button from '@cloudscape-design/components/button';
import Form from '@cloudscape-design/components/form';
import Header from '@cloudscape-design/components/header';
import HelpPanel from '@cloudscape-design/components/help-panel';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Breadcrumbs from '../../components/breadcrumbs';
import Marketing from './components/marketing';
import Navigation from '../../components/navigation';
import Shape from './components/shape';
import ShellLayout from '../../layouts/shell';
import { BasicValidationContext, useBasicValidation } from './validation/basic-validation';
import { ContentLayout } from '@cloudscape-design/components';

export default function App() {
  const { isFormSubmitted, setIsFormSubmitted, addErrorField, focusFirstErrorField } = useBasicValidation();

  return (
    <ShellLayout
      contentType="form"
      breadcrumbs={<Breadcrumbs active={{ text: 'Create meeting', href: '/create-meeting/index.html' }} />}
      navigation={<Navigation />}
      tools={<HelpPanel header={<h2>Help panel</h2>} />}
    >
      <ContentLayout
        header={
          <Header
            variant="h1"
            description="Create a new meeting by specifying details, quality, and price. On creation a meeting will be tested by the product and marketing team."
          >
            Create meeting
          </Header>
        }
      >
        <SpaceBetween size="m">
          <BasicValidationContext.Provider value={{ isFormSubmitted: isFormSubmitted, addErrorField: addErrorField }}>
            <form
              onSubmit={event => {
                setIsFormSubmitted(true);
                focusFirstErrorField();
                event.preventDefault();
              }}
            >
              <Form
                actions={
                  <SpaceBetween direction="horizontal" size="xs">
                    <Button href="/meetings/index.html" variant="link">
                      Cancel
                    </Button>
                    <Button formAction="submit" variant="primary">
                      Create meeting
                    </Button>
                  </SpaceBetween>
                }
              >
                <SpaceBetween size="l">
                  <Shape />
                  <details />
                  <Marketing />
                </SpaceBetween>
              </Form>
            </form>
          </BasicValidationContext.Provider>
        </SpaceBetween>
      </ContentLayout>
    </ShellLayout>
  );
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Textarea from '@cloudscape-design/components/textarea';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { useState } from 'react';
import { BasicValidationContext } from '../validation/basic-validation';

export default function MeetingDetails() {
  const [wholeSalePrice, setWholeSalePrice] = useState('');
  const [presenterName, setRetailPrice] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const isEmptyString = (value: string) => !value?.length;

  return (
    <BasicValidationContext.Consumer>
      {({ isFormSubmitted, addErrorField }) => {
        const wholeSalePriceErrorText = isEmptyString(wholeSalePrice) && 'Link is required.';
        const presenterNameErrorText = isEmptyString(presenterName) && 'Presenter is required.';

        return (
          <Container header={<Header variant="h2">MeetingDetails</Header>}>
            <FormField label="Prices" description="Define the prices for wholesale and retail.">
              <SpaceBetween direction="vertical" size="l">
                <ColumnLayout columns={2}>
                  <FormField
                    label="Meetup Link"
                    stretch={true}
                    errorText={isFormSubmitted && wholeSalePriceErrorText}
                    i18nStrings={{
                      errorIconAriaLabel: 'Error',
                    }}
                  >
                    <Input
                      value={wholeSalePrice}
                      onChange={({ detail }) => setWholeSalePrice(detail.value)}
                      type="text"
                      ref={ref => {
                        addErrorField('wholeSalePrice', { isValid: !wholeSalePriceErrorText, ref });
                      }}
                    />
                  </FormField>
                  <FormField
                    label="Speaker Names"
                    stretch={true}
                    errorText={isFormSubmitted && presenterNameErrorText}
                    i18nStrings={{
                      errorIconAriaLabel: 'Error',
                    }}
                  >
                    <Input
                      value={presenterName}
                      onChange={({ detail }) => setRetailPrice(detail.value)}
                      type="text"
                      ref={ref => {
                        addErrorField('presenterName', { isValid: !presenterNameErrorText, ref });
                      }}
                    />
                  </FormField>
                </ColumnLayout>
                <FormField
                  label={
                    <>
                      Additional notes<i> - optional</i>
                    </>
                  }
                  stretch={true}
                >
                  <Textarea onChange={({ detail }) => setAdditionalNotes(detail.value)} value={additionalNotes} />
                </FormField>
              </SpaceBetween>
            </FormField>
          </Container>
        );
      }}
    </BasicValidationContext.Consumer>
  );
}

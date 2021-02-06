// Third Party
import JSONPretty from 'react-json-pretty';
import React, { FunctionComponent } from 'react';
import axios, { AxiosError } from 'axios';
import { Alert, Divider, Card, Row, Col, Spin } from 'antd';
import { JSONSchema7 } from 'json-schema';
import { Theme as AntDTheme } from '@rjsf/antd';
import { isEqual } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { withTheme, FormSubmit } from '@rjsf/core';
import API from '../../utils/api';
import { TransactionPOJO } from "@shipengine/connect-sdk/lib/internal";

// Styles & Assets
import 'react-json-pretty/themes/adventure_time.css';

const Form = withTheme(AntDTheme);

interface Props {
  connectSchema: JSONSchema7;
  connectUiSchema: JSONSchema7;
  settingsSchema: JSONSchema7;
  settingsUiSchema: JSONSchema7;
}

const ConnectFrom: FunctionComponent<Props> = ({ connectSchema, connectUiSchema, settingsSchema, settingsUiSchema }) => {
  const [request, setRequest] = React.useState({});
  const [response, setResponse] = React.useState<TransactionPOJO | undefined>(undefined);

  const handleSubmit = async (formSubmit: FormSubmit<Record<string, unknown>>) => {
    const body = {
      transaction: {
        id: uuidv4(),
        language: '*',
        session: {},
      },
      connectionFormData: formSubmit.formData,
    };
    setRequest(body);
    let response;
    try {
      const { data } = await axios.put<TransactionPOJO>(API.putConnect, body);
      response = data;
    } catch (error) {
      const errorWithType = error as AxiosError<TransactionPOJO>;

      response = errorWithType.response?.data as TransactionPOJO;
    }

    setResponse(response);
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Card title='Connect Form' style={{ margin: '0 5px' }}>
            <Form schema={connectSchema} onSubmit={handleSubmit} uiSchema={connectUiSchema} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title='Connect Inputs/Outputs' style={{ margin: '0 5px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              {!response ? (
                <Spin />
              ) : (
                  <>
                    <h4>Connect Args</h4>
                    <JSONPretty
                      id='json-pretty'
                      data={request}
                      style={{
                        maxWidth: '850px',
                      }}></JSONPretty>

                    <Divider plain />

                    <h4>Connect Return Value</h4>
                    <JSONPretty
                      id='json-pretty'
                      data={response}
                      style={{
                        maxWidth: '850px',
                      }}></JSONPretty>
                  </>
                )}
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}><Divider /></Col>
      </Row>
      <Row>
        <Col span={12}>
          <Alert
            message="Note"
            description={"Submitting the form below currently does not trigger any actions."}
            type="warning"
            closable
            style={{ margin: '5px' }}
          />
          <Card title='Settings Form' style={{ margin: '0 5px' }}>
            <Form schema={settingsSchema} uiSchema={settingsUiSchema} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(ConnectFrom, function compare(
  { connectSchema: prevConnectSchema, connectUiSchema: prevConnectUiSchema, settingsSchema: prevSettingsSchema, settingsUiSchema: prevSettingsUiSchema },
  { connectSchema: newConnectSchema, connectUiSchema: newConnectUiSchema, settingsSchema: newSettingsSchema, settingsUiSchema: newSettingsUiSchema },
) {
  return isEqual(prevConnectSchema, newConnectSchema) || isEqual(prevSettingsSchema, newSettingsSchema) || isEqual(prevConnectUiSchema, newConnectUiSchema) || isEqual(prevSettingsUiSchema, newSettingsUiSchema);
});

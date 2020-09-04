// Third Party
import JSONPretty from 'react-json-pretty';
import React, { FunctionComponent } from 'react';
import axios, { AxiosError } from 'axios';
import { Divider, Card, Row, Col } from 'antd';
import { JSONSchema7 } from 'json-schema';
import { Theme as AntDTheme } from '@rjsf/antd';
import { isEqual } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { withTheme, FormSubmit } from '@rjsf/core';
import API from '../../utils/api';

// Components
import Spinner from '../../components/spinner';

// Styles & Assets
import 'react-json-pretty/themes/adventure_time.css';

const Form = withTheme(AntDTheme);

interface Props {
  schema: JSONSchema7;
  uiSchema: JSONSchema7;
}
const ConnectFrom: FunctionComponent<Props> = ({ schema, uiSchema }) => {
  const [request, setRequest] = React.useState({});
  const [response, setResponse] = React.useState(undefined);

  const handleSubmit = async (formSubmit: FormSubmit) => {
    const body = {
      transaction: {
        id: uuidv4(),
        session: {},
      },
      connectionFormData: formSubmit.formData,
    };
    setRequest(body);
    let response;
    try {
      const { data } = await axios.put(API.putConnect, body);
      response = data;
    } catch (error) {
      const errorWithType = error as AxiosError;

      response = errorWithType.response?.data;
    }

    setResponse(response);
  };

  return (
    <Row>
      <Col span={12}>
        <Card title='Connect Form' style={{ margin: '0 5px' }}>
          <Form schema={schema} onSubmit={handleSubmit} uiSchema={uiSchema} />
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
              <Spinner />
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
  );
};

export default React.memo(ConnectFrom, function compare(
  { schema: prevSchema },
  { schema: newSchema },
) {
  return isEqual(prevSchema, newSchema);
});

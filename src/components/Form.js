import React, { useState } from 'react';
import { Form, Select, Switch, Radio, Slider, Button } from 'antd';
import axios from 'axios';
import { suburbNames, propertyTypes } from '../data/suburbs';
import './Form.scss';
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const predictURL = 'http://127.0.0.1:5000/predict_home_price';

const PredictionForm = ({ setResults, setLoading }) => {
  const [disabled, setDisabled] = useState(true);

  const onFinish = (values) => {
    const requests = values.suburb.map((req, i) => {
      return axios.post(predictURL, { ...values, suburb: values.suburb[i] });
    });
    setLoading(true);
    setTimeout(() => {
      try {
        axios.all(requests).then((responses) => {
          const res = responses.map((r) => r.data);
          setResults(res);
        });
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <>
      <div className="switch">
        <h3>Click this to start</h3>
        <Form.Item name="start" valuePropName="checked">
          <Switch onClick={() => setDisabled(!disabled)} />
        </Form.Item>
      </div>
      <div className="prediction-form">
        <Form name="predictionForm" {...formItemLayout} onFinish={onFinish}>
          <Form.Item
            name="suburb"
            label="Select Suburb"
            rules={[
              {
                required: true,
                message: 'This field is required!',
              },
            ]}
          >
            <Select
              size="large"
              mode="multiple"
              disabled={disabled}
              placeholder="Please select a suburb"
            >
              {suburbNames.map((suburb) => (
                <Option value={suburb}>{suburb}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="bed"
            label="No.Bedrooms"
            rules={[{ required: true, message: 'Please pick a type!' }]}
          >
            <Slider
              min={1}
              max={10}
              disabled={disabled}
              defaultValue={[1, 10]}
              marks={{
                1: 1,
                2: 2,
                3: 3,
                4: 4,
                5: 5,
                6: 6,
                7: 7,
                8: 8,
                9: 9,
                10: 10,
              }}
            />
          </Form.Item>
          <Form.Item
            name="bath"
            label="No.Bathrooms"
            rules={[{ required: true, message: 'Please pick a type!' }]}
          >
            <Slider
              min={1}
              max={10}
              disabled={disabled}
              defaultValue={[1, 10]}
              marks={{
                1: 1,
                2: 2,
                3: 3,
                4: 4,
                5: 5,
                6: 6,
                7: 7,
                8: 8,
                9: 9,
                10: 10,
              }}
            />
          </Form.Item>

          <Form.Item
            name="propType"
            label="Property Types"
            rules={[{ required: true, message: 'Please pick a type!' }]}
          >
            <Radio.Group disabld={disabled}>
              {propertyTypes.map((type, i) => (
                <Radio.Button value={i}>{type}</Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button
              block
              style={{ width: 360, marginLeft: 10 }}
              htmlType="submit"
              disabled={disabled}
            >
              Estimate
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default PredictionForm;

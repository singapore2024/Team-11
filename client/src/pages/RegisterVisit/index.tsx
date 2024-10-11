import React, { useState } from "react";
import "../commonStyles.css";
import "../../App.css";
import "./styles.css";
import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  DatePickerProps,
  Form,
  FormProps,
  message,
  Descriptions,
  Tag,
  Typography,
  Space,
  Divider,
  Image,
  Table,
} from "antd";
import { SeniorCard } from "../../components/Card/SeniorCard";
import {
  AreaChartOutlined,
  EnvironmentOutlined,
  IdcardOutlined,
  InfoCircleTwoTone,
  TeamOutlined,
} from "@ant-design/icons";
import { VisitInterface, VisitStatus } from "../../models/interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { navigateToRoute } from "../../components/utils";
import { createVisit, getLatestVisitId } from "../../api";
import dayjs from "dayjs";
import { farmData } from "../../models/dummyData";

interface TimeslotButtonProps {
  time: string;
  setSelectedTime: (time: string) => void;
  isSelected: boolean;
}

export const TimeSlotButton: React.FC<TimeslotButtonProps> = (props) => {
  return (
    <Button
      className="timeslotBtn"
      type={props.isSelected ? "primary" : "default"}
      onClick={() => props.setSelectedTime(props.time)}
    >
      {props.time}
    </Button>
  );
};

const RegisterVisit: React.FC = () => {
  const { state } = useLocation();
  // const { senior } = state
  const senior = farmData;
  const [loading, setLoading] = useState<boolean>(false);

  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  if (!token) {
    navigateToRoute("/", navigate);
  }

  const [selectedTimeslot, setSelectedTimeslot] = useState<string>();

  const timeslots = ["8AM-11AM", "11AM-2PM", "2PM-5PM", "5PM-8PM"];

  const { Title, Paragraph, Text } = Typography;

  // const handleConfirmVisit: FormProps['onFinish'] = (fieldValues) => {
  //     const dateValue = fieldValues['visitDate']

  //     setLoading(true)
  //     const userId = localStorage.getItem('user_id');
  //     const visitDetails: VisitInterface = {
  //         date: dateValue.format('DD MMM YYYY'),
  //         time: selectedTimeslot!,
  //         senior_id: senior.senior_id,
  //         visitor_ids: [Number(userId)],
  //         status: VisitStatus.UPCOMING
  //     }

  //     const postData = async () => {
  //         try {
  //             await createVisit(visitDetails);
  //             const visitId = await getLatestVisitId();

  //             setLoading(false)
  //             console.log('loading', loading)

  //             message.success('Visit confirmed')

  //             navigateToRoute(`/visit-confirmed/${visitId}`, navigate)
  //         } catch (error) {
  //             console.error("Error fetching senior data:", error);
  //         }
  //     };

  //     postData();
  // }

  const disabledDate: DatePickerProps["disabledDate"] = (current) => {
    // Can not select days before today
    return current < dayjs().subtract(1, "day").endOf("day");
  };

  const handleJoinFarm = () => {
    setLoading(true);
    const userId = localStorage.getItem("user_id");

    // You might want to adjust this object structure based on your API requirements
    const joinFarmDetails = {
      farm_id: farmData.farm_id,
      user_id: Number(userId),
      join_date: dayjs().format("DD MMM YYYY"),
    };

    const postData = async () => {
      try {
        // Replace 'joinFarm' with your actual API function to join a farm
        // await joinFarm(joinFarmDetails);

        setLoading(false);
        message.success("Successfully joined the farm!");
        navigateToRoute("/profile", navigate); // Navigate to a confirmation page
      } catch (error) {
        console.error("Error joining farm:", error);
        setLoading(false);
        message.error("Failed to join farm. Please try again.");
      }
    };

    postData();
  };

  const inventoryData = [
    {
      key: 1,
      cropName: "Tomatoes",
      variety: "Roma",
      quantity: 50,
      unit: "kg",
      plantingDate: "2023-05-20",
      harvestDate: "2023-08-15",
      status: "Ready for Harvest",
      notes: "Organic, pesticide-free",
    },
    {
      key: 2,
      cropName: "Lettuce",
      variety: "Romaine",
      quantity: 100,
      unit: "heads",
      plantingDate: "2023-06-15",
      harvestDate: "2023-07-30",
      status: "Harvested",
      notes: "Hydroponic system",
    },
    {
      key: 3,
      cropName: "Carrots",
      variety: "Nantes",
      quantity: 75,
      unit: "kg",
      plantingDate: "2023-06-01",
      harvestDate: "2023-09-01",
      status: "Growing",
      notes: "Companion planted with onions",
    },
    {
      key: 4,
      cropName: "Bell Peppers",
      variety: "California Wonder",
      quantity: 30,
      unit: "kg",
      plantingDate: "2023-05-10",
      harvestDate: "2023-08-20",
      status: "Ready for Harvest",
      notes: "Greenhouse grown",
    },
    {
      key: 5,
      cropName: "Cucumbers",
      variety: "English",
      quantity: 40,
      unit: "kg",
      plantingDate: "2023-05-25",
      harvestDate: "2023-07-25",
      status: "Harvested",
      notes: "Trellised for vertical growth",
    },
    {
      key: 6,
      cropName: "Spinach",
      variety: "Bloomsdale",
      quantity: 60,
      unit: "bunches",
      plantingDate: "2023-07-01",
      harvestDate: "2023-08-10",
      status: "Growing",
      notes: "Shade cloth used",
    },
  ];

  const columns = [
    {
      title: "Crop Name",
      dataIndex: "cropName",
      key: "cropName",
      sorter: (a, b) => a.cropName.localeCompare(b.cropName),
    },
    {
      title: "Variety",
      dataIndex: "variety",
      key: "variety",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
      render: (text, record) => `${text} ${record.unit}`,
    },
    {
      title: "Planting Date",
      dataIndex: "plantingDate",
      key: "plantingDate",
      sorter: (a, b) => new Date(a.plantingDate) - new Date(b.plantingDate),
    },
    {
      title: "Harvest Date",
      dataIndex: "harvestDate",
      key: "harvestDate",
      sorter: (a, b) => new Date(a.harvestDate) - new Date(b.harvestDate),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color =
          status === "Growing"
            ? "green"
            : status === "Ready for Harvest"
            ? "gold"
            : "blue";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
  ];

  return (
    <div className={"registerContainer"}>
      <div className={"registerHeader"}>
        <h1>let's Farm!</h1>
        <h3 style={{ marginBottom: "0" }}>Join this farm</h3>
      </div>

      <Image
        src="https://cdn.shopify.com/s/files/1/1161/5908/files/IMG_3641_1024x1024.jpg?v=1582058779"
        alt="Community Garden Farm"
        style={{
          width: "100%",
          maxHeight: "300px",
          objectFit: "cover",
          marginBottom: "24px",
        }}
      />

      <Card
        title={<Title level={2}>Farm Details</Title>}
        extra={<Tag color="green">ID: {farmData.farm_id}</Tag>}
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Descriptions
            column={2}
            labelStyle={{ fontSize: "16px" }}
            contentStyle={{ fontSize: "16px" }}
          >
            <Descriptions.Item
              label={
                <>
                  <EnvironmentOutlined /> Address
                </>
              }
            >
              {farmData.address}
            </Descriptions.Item>
            <Descriptions.Item label="Postal Code">
              {farmData.postal_code}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <AreaChartOutlined /> Plot Size
                </>
              }
            >
              {farmData.plot_size} sq m
            </Descriptions.Item>
            {/* <Descriptions.Item
              label={
                <>
                  <IdcardOutlined /> Inventory ID
                </>
              }
            >
              {farmData.inventory_id}
            </Descriptions.Item> */}
            <Descriptions.Item label="Lat Long">
              {farmData.lat}, {farmData.lon}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">
            <Text strong style={{ fontSize: "18px" }}>
              Farm Story
            </Text>
          </Divider>
          <Paragraph style={{ fontSize: "16px" }}>{farmData.story}</Paragraph>

          <Divider orientation="left">
            <Text strong style={{ fontSize: "18px" }}>
              Farmers
            </Text>
          </Divider>
          <Space wrap>
            <TeamOutlined style={{ fontSize: "16px" }} />
            {farmData.list_of_farmers.map((farmerId) => (
              <Tag key={farmerId} color="blue" style={{ fontSize: "14px" }}>
                Farmer {farmerId}
              </Tag>
            ))}
          </Space>
        </Space>
      </Card>

      <div className={"register-visit"}>
        {/* {senior && 
                <SeniorCard senior={senior} showDetails={true}/> } */}

        {/* <Form
                    scrollToFirstError
                    onFinish={handleConfirmVisit}
                    name="register"
                    layout="inline"
                    labelCol={{ span: 6 }}
                    className='formInput'
                    colon={false}
                >
                    <Form.Item
                        label="Date"
                        name="visitDate"
                        rules={[{ required: true, message: 'Please input intended date of visit!' }]}
                    >
                        <DatePicker 
                            style={{width:'200px'}} 
                            disabledDate={disabledDate}
                        />
                    </Form.Item>

                    <Form.Item name='visitTime' label="Timeslot" required={true} rules={[{validator: () => {
                        if (selectedTimeslot) {
                            return Promise.resolve()
                        }

                        return Promise.reject(new Error('Please select a timeslot!'));
                    }}]}
                    >{
                        timeslots.map((time) => (
                            <TimeSlotButton 
                                key={time}
                                time={time} 
                                setSelectedTime={setSelectedTimeslot}
                                isSelected={time === selectedTimeslot}
                            />
                        ))
                    }
                    </Form.Item>  */}

        <div className={"note"}>
          <h3>
            Important Notes <InfoCircleTwoTone style={{ fontSize: 14 }} />
          </h3>
          To ensure the well being of our farm, please read the following terms
          of usage:
          <ul>
            <li>
              A farm coordinator will provide an orientation on your first
              visit.
            </li>
            <li>
              You're not required to stay for the entire duration of your
              scheduled slot.
            </li>
            <li>
              Always follow safety guidelines and use provided equipment
              properly.
            </li>
            <li>
              <b>What you can do:</b> planting, weeding, harvesting, or
              maintenance tasks.
            </li>
            <li>
              Respect the farm's ecosystem and follow organic farming practices
              if applicable.
            </li>
            <li>
              Be mindful of other volunteers and maintain a collaborative
              atmosphere.
            </li>
            <li>
              Remember to mark your visit as completed and fill out the
              post-visit form for tracking purposes.
            </li>
            <li>
              If you can't make it, please indicate that you've missed your
              slot.
            </li>
            <li>
              Consistent no-shows (more than 5 times) may result in restricted
              access to future slots.
            </li>
            <li>Wear appropriate clothing and footwear for outdoor work.</li>
            <li>
              Bring water, sunscreen, and any personal items you might need.
            </li>
            <li>
              Ask questions if you're unsure about any tasks or procedures.
            </li>
          </ul>
        </div>

        {/* <Form.Item
                        name="acknowledgement"
                        valuePropName="checked"
                        rules={[{
                            validator: (_, value) =>
                              value ? Promise.resolve() : Promise.reject(new Error('Please acknowledge agreement!')),
                          },]}
                    >
                        <Checkbox>I have read the <a>Terms & Conditions</a></Checkbox>
                    </Form.Item>


                    <Form.Item>
                        <Button 
                            type={'primary'}
                            className={'confirmButton'} 
                            htmlType='submit'
                        >
                            Confirm Visit
                        </Button>
                    </Form.Item>
                </Form> */}
        <div style={{ marginTop: "24px", marginBottom: "24px" }}>
          <Title level={3}>Farm Inventory</Title>
          <Table
            dataSource={inventoryData}
            columns={columns}
            pagination={false}
            style={{ marginBottom: "24px" }}
            scroll={{ x: "max-content" }}
          />
        </div>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <Button
            type="primary"
            size="large"
            onClick={handleJoinFarm}
            loading={loading}
            style={{ width: "200px" }}
          >
            Join Farm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterVisit;

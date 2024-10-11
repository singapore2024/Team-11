import React, { useEffect, useState } from "react";
import "./styles.css";
import { Avatar, Button, Tag } from "antd";
import {
  SeniorInterface,
  VisitInterface,
  VisitStatus,
  visitToColorMapping,
} from "../../models/interfaces";
import { getSeniorByIdData } from "../../api";
import {
  handleCancelVisit,
  handleCompleteVisit,
  handleMissVisit,
  navigateToRoute,
  separatedArray,
} from "../utils";
import {
  CheckCircleTwoTone,
  ClockCircleOutlined,
  DownOutlined,
  EnvironmentOutlined,
  EnvironmentTwoTone,
  FrownTwoTone,
  UpOutlined,
  ZhihuOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Granny from "../../assets/logo.png";
import Grandpa from "../../assets/grandpa.jpg";
import CancelModal from "../CancelModal";
import dayjs from "dayjs";
import { farmData } from "../../models/dummyData";

interface Props {
  visit: VisitInterface;
  cancellable?: boolean;
}

export const VisitCard: React.FC<Props> = (props) => {
  const { visit } = props;
  const farm = farmData;
  const navigate = useNavigate();

  const [isActionsExpanded, setIsActionsExpanded] = useState<boolean>(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);

  const onClickCancelButton = () => {
    setIsCancelModalOpen(true);
  };

  const onCloseModal = () => {
    setIsCancelModalOpen(false);
  };

  const onConfirmCancel = () => {
    handleCancelVisit(visit);
    onCloseModal();
  };

  const [senior, setSenior] = useState<SeniorInterface | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const seniorData = await getSeniorByIdData(visit.senior_id);
        setSenior(seniorData);
      } catch (error) {
        console.error("Error fetching senior data:", error);
      }
    };

    fetchData();
  }, [visit.senior_id]);

  const seniorAvatar = senior && (
    <Avatar
      style={{ height: "30px", marginRight: "0.5rem" }}
      src={senior.gender.toLowerCase() == "m" ? Grandpa : Granny}
    />
  );

  const handleViewVisitDetails = () => {
    // add api to mark visit as completed
    navigateToRoute(`/visit-details/${visit.visit_id}`, navigate);
  };

  let curVisitStatus = visit.status;

  if (
    visit.status !== VisitStatus.CANCELLED &&
    visit.status !== VisitStatus.COMPLETED &&
    visit.status !== VisitStatus.MISSED
  ) {
    if (dayjs(visit.date) < dayjs().startOf("day")) {
      curVisitStatus = VisitStatus.EXPIRED;
    }
  }

  const handleCheckInClick = () => {
    navigateToRoute(`/check-in/${visit.visit_id}`, navigate);
  };

  let visitDetails;
  if (true) {
    visitDetails = (
      <div className="visitInfo">
        <div className="visitHeader">
          {/* <Tag
            style={{ marginRight: 0, marginBottom: "0.5rem" }}
            color={visitToColorMapping[curVisitStatus as VisitStatus]}
          >
            {curVisitStatus}
          </Tag> */}
          {/* <div className={"visitDate"}>{visit.date}</div> */}
        </div>
        <div className={"visitTitle"}>
          <span className={"seniorTitle"}>
            {" "}
            {seniorAvatar} Farm: {farm.farm_id}
          </span>
        </div>

        <div className="visitRow">
          <span style={{ marginRight: "0.25rem" }}>
            Address: {farm.address}
          </span>
        </div>

        <div className="visitRow">
          <span style={{ marginRight: "0.25rem" }}>
            Number of farmers: {farm.list_of_farmers.length}
          </span>
        </div>

        <div className="visitRow">
          <span style={{ marginRight: "0.25rem" }}>
            Plot size: {farm.plot_size}
          </span>
        </div>

        {/* <div className="visitRow">
          <ClockCircleOutlined style={{ marginRight: "0.5rem" }} />
          <span style={{ marginRight: "0.25rem" }}>Visit time:</span>
          {visit.time}
        </div>

        <div className="visitRow" style={{ marginBottom: "0.5rem" }}>
          <EnvironmentOutlined style={{ marginRight: "0.5rem" }} />
          <span>Postal: {senior.postal_code}</span>
        </div> */}

        {props.cancellable && (
          <>
            <div className="visitRow">
              <a
                className="visitRow"
                onClick={() => setIsActionsExpanded(!isActionsExpanded)}
              >
                View Actions
                {!isActionsExpanded ? (
                  <DownOutlined
                    style={{
                      fontSize: "10px",
                      marginLeft: "0.25rem",
                      marginTop: "0.05rem",
                    }}
                  />
                ) : (
                  <UpOutlined
                    style={{
                      fontSize: "10px",
                      marginLeft: "0.25rem",
                      marginTop: "0.05rem",
                    }}
                  />
                )}
              </a>
            </div>
            {isActionsExpanded && (
              <div>
                {curVisitStatus !== VisitStatus.EXPIRED && (
                  <Button
                    className={"cancelBtn"}
                    onClick={handleViewVisitDetails}
                  >
                    View Details
                  </Button>
                )}
                {curVisitStatus === VisitStatus.UPCOMING && (
                  <>
                    <Button
                      className={"cancelBtn"}
                      onClick={handleCheckInClick}
                    >
                      Check In <CheckCircleTwoTone twoToneColor={"#faad14"} />
                    </Button>
                    <Button
                      className={"cancelBtn"}
                      onClick={onClickCancelButton}
                    >
                      Cancel Visit <FrownTwoTone twoToneColor="#eb2f96" />
                    </Button>
                  </>
                )}
                {curVisitStatus === VisitStatus.ONGOING && (
                  <Button
                    className={"cancelBtn"}
                    onClick={() => handleCompleteVisit(visit, navigate)}
                  >
                    Mark as Completed{" "}
                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                  </Button>
                )}
                {curVisitStatus === VisitStatus.EXPIRED && (
                  <>
                    <Button
                      className={"cancelBtn"}
                      onClick={() => handleMissVisit(visit)}
                    >
                      I missed the visit <FrownTwoTone twoToneColor="#eb2f96" />
                    </Button>
                    <Button
                      className={"cancelBtn"}
                      onClick={() => handleMissVisit(visit)}
                    >
                      I forgot to check in{" "}
                      <EnvironmentTwoTone twoToneColor="#eb2f96" />
                    </Button>
                  </>
                )}
                <CancelModal
                  open={isCancelModalOpen}
                  handleClose={onCloseModal}
                  onClickConfirm={onConfirmCancel}
                />
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  return <div className="visitCard">{visitDetails}</div>;
};

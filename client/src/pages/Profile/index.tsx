import React, { useEffect, useState } from "react";
import {
  HomeOutlined,
  LogoutOutlined,
  MailOutlined,
  PhoneOutlined,
  ZhihuOutlined,
} from "@ant-design/icons";
import {
  UserInterface,
  VisitInterface,
  VisitStatus,
} from "../../models/interfaces";
import { navigateToRoute, separatedArray } from "../../components/utils";
import "./styles.css";
import { Button, Divider, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { getUserByIdData, getUserVisitData } from "../../api";
import { VisitCard } from "../../components/Card/VisitCard";

interface profileItem {
  key: React.Key;
  icon: JSX.Element;
  children: JSX.Element;
}

const Profile: React.FC = () => {
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  if (!token) {
    navigateToRoute("/", navigate);
  }

  // const user: UserInterface = useMemo(() => ({
  // 	user_id: 1,
  // 	nric: localStorage.getItem('nric')!,
  // 	name: localStorage.getItem('name')!,
  // 	email: localStorage.getItem('email')!,
  // 	mobile: localStorage.getItem('mobile')!,
  // 	gender: localStorage.getItem('gender')!,
  // 	age: Number(localStorage.getItem('age'))!,
  // 	languages: JSON.parse(localStorage.getItem('languages')!),
  // 	postal_code: Number(localStorage.getItem('postalCode'))!,
  // 	address: localStorage.getItem('address')!,
  // }), [])

  // api endpoint - get user
  const [user, setUser] = useState<UserInterface>();
  const [pastVisits, setPastVisits] = useState<VisitInterface[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserByIdData(
          localStorage.getItem("user_id")!
        );
        setUser(userData);
        const visitsData = await getUserVisitData(
          Number(localStorage.getItem("user_id"))
        );
        setPastVisits(
          visitsData.filter(
            (visit: VisitInterface) =>
              visit.status === VisitStatus.CANCELLED ||
              visit.status === VisitStatus.COMPLETED ||
              visit.status === VisitStatus.MISSED
          )
        );
      } catch (error) {
        console.error("Error fetching visits data:", error);
      }
    };

    fetchData();
  }, []);

  const visitCards = pastVisits.slice(0, 2).map((visit) => {
    return <VisitCard key={visit.visit_id} visit={visit} />;
  });

  const profileItems: profileItem[] = [
    {
      key: "languages",
      icon: <ZhihuOutlined />,
      children: (
        <span>
          Speaks <span>{separatedArray(user && user.languages)}</span>
        </span>
      ),
    },
    {
      key: "address",
      icon: <HomeOutlined />,
      children: (
        <span>
          Lives in <span>{user && user.address}</span>
        </span>
      ),
    },
    {
      key: "email",
      icon: <MailOutlined />,
      children: <span>{user && user.email}</span>,
    },
    {
      key: "mobile",
      icon: <PhoneOutlined />,
      children: <span>{user && user.mobile}</span>,
    },
  ];

  const profileAttributes = profileItems.map((attr) => {
    return (
      <React.Fragment key={attr.key}>
        <div key={attr.key} className={"profileDetail"}>
          {attr.icon}
          {attr.children}
        </div>
        <Divider style={{ margin: "0.5rem" }} />
      </React.Fragment>
    );
  });

  return (
    <div className={"profileContainer"}>
      <div className={"section"}>
        <div className={"row"}>
          <h3>Profile</h3>
          <a
            style={{ cursor: "pointer" }}
            onClick={() => {
              localStorage.clear();
              navigateToRoute("/", navigate);
            }}
          >
            {" "}
            Sign Out <LogoutOutlined />
          </a>
        </div>
        <Image
          className={"profileImg"}
          width={150}
          src={"https://avatar.iran.liara.run/public"}
        />
        <div className={"column"}>
          {user && (
            <h2 className={"name"}>
              {user.name.split(" ")[0]}, {user.age}
              {user.gender}
            </h2>
          )}
          {profileAttributes}
        </div>
      </div>

      <div className={"section"}>
        <div className={"row"}>
          <h3>Farms Joined</h3>
        </div>

        {pastVisits.length === 0 ? (
          <>
            <p>You don't have any past visits.</p>
            <div className={"buttons"}>
              <Button
                onClick={() => navigateToRoute("/home", navigate)}
                style={{ marginTop: "1rem" }}
              >
                Explore
              </Button>
            </div>
          </>
        ) : (
          visitCards
        )}
      </div>
    </div>
  );
};

export default Profile;

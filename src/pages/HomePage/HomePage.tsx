import React from "react";
import { PageContainer } from "@Components";

// Module Import
import { userSelector } from "@Modules";
import { connectStore } from "@Store";

// Types Import
import { MapStateToPropsType, StateType, UserType } from "@Types";

const mapState: MapStateToPropsType = (state: StateType) => ({
  user: userSelector(state)
});

type HomePageProps = {
  user: UserType;
};

const HomePage = ({ user }: HomePageProps) => {
  return (
    <PageContainer header={"Home"}>
      {user && (
        <div>{`You've logged in with ${user.tenants[0].tenantName}`}</div>
      )}
    </PageContainer>
  );
};

HomePage.displayName = "HomePage";

export default connectStore(mapState)(HomePage);

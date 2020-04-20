import _ from "lodash";
import Roadmap from "./Roadmap";

// Module Import
import {
  systemsSelector,
  isLoading,
  loadSystems,
  loadPublicSystems
} from "@Modules";
import { connectStore } from "@Store";

import { useUser } from "@Contexts";

// Static Data Import
import PhaseDescriptions from "../../static-data/phaseDescriptions";
import SystemCategories from "../../static-data/systemCategories";
import SystemIcons from "../../static-data/systemIcons";
import PhaseIcons from "../../static-data/phaseIcons";

// Types Import
import {
  ConnectedEnterprisePhaseSystemType,
  MapStateToPropsType,
  StateType
} from "@Types";

const mapState: MapStateToPropsType = (state: StateType) => {
  const allSystems: Array<ConnectedEnterprisePhaseSystemType> = systemsSelector(
    state
  );
  const groupedSystems = _.groupBy(allSystems, "connectedEnterprisePhaseId");
  const { user } = useUser();

  return {
    categoriedSystems: _.keys(groupedSystems).map(phaseId => {
      const numberedPhasedId = parseInt(phaseId);
      const systems = groupedSystems[phaseId];
      const firstItem = systems[0];
      const customerCategories = SystemCategories.filter(category =>
        category.phases.includes(numberedPhasedId)
      );

      return {
        phaseId,
        description: PhaseDescriptions[numberedPhasedId],
        icon: PhaseIcons[firstItem.phaseIconFileName],
        step: `0${numberedPhasedId}`,
        title: firstItem.phaseName,
        customerCategories,
        customerIcons: systems.map(system => ({
          displayOnRoadmap: system.displayOnRoadmap,
          label: system.systemName,
          path: SystemIcons[system.systemName],
          category: customerCategories
            .filter(category => category.systems.includes(system.systemId))
            .map(category => category.id)
        }))
      };
    }),
    isLoading: user
      ? isLoading(loadSystems)(state)
      : isLoading(loadPublicSystems)(state)
  };
};

export default connectStore(mapState)(Roadmap);

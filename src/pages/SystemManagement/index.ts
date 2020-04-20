import _ from 'lodash';
import SystemManagement from './SystemManagement';

// Module Import
import {
  systemsSelector,
  tenantSystemsSelector,
  tenantPhaseManualEntriesSelector,
  userSelector,
  selectSystem,
  deselectSystem,
  loadTenantSystems,
  addTenantPhaseManualEntry,
  updateTenantPhaseManualEntry,
  deleteTenantPhaseManualEntry
} from '@Modules';
import { connectStore } from '@Store';

// Types Import
import { MapStateToPropsType, StateType, MapDispatchToPropsType } from '@Types';

// Static Data Import
import PhaseDescriptions from '../../static-data/phaseDescriptions';
import SystemCategories from '../../static-data/systemCategories';
import SystemIcons from '../../static-data/systemIcons';
import PhaseIcons from '../../static-data/phaseIcons';

const mapState: MapStateToPropsType = (state: StateType) => ({
  user: userSelector(state),
  getCategoriedSystems() {
    const allSystems: Array<any> = systemsSelector(state);
    const tenantSystems: Array<any> = tenantSystemsSelector(state);
    const tenantPhaseManualEntries = tenantPhaseManualEntriesSelector(state);
    const groupedSystems = _.groupBy(allSystems, 'connectedEnterprisePhaseId');

    return _.keys(groupedSystems).map(phaseId => {
      const numberedPhasedId = parseInt(phaseId);
      const systems = groupedSystems[phaseId];
      const firstItem = systems[0];
      const customerCategories = SystemCategories.filter(category =>
        category.phases.includes(numberedPhasedId)
      );

      return {
        phaseId: numberedPhasedId,
        description: PhaseDescriptions[numberedPhasedId],
        icon: PhaseIcons[firstItem.phaseIconFileName],
        step: `0${numberedPhasedId}`,
        title: firstItem.phaseName,
        customerCategories,
        customerIcons: systems.map(system => {
          const selected = tenantSystems.find(
            tenantSystem =>
              tenantSystem.connectedEnterprisePhaseSystemId === system.id
          );

          return {
            phaseSystemId: system.id,
            systemId: system.systemId,
            label: system.systemName,
            path: SystemIcons[system.systemName],
            category: customerCategories
              .filter(category => category.systems.includes(system.systemId))
              .map(category => category.id),
            selected
          };
        }),
        manualEntries: tenantPhaseManualEntries.filter(
          manualEntry =>
            manualEntry.connectedEnteprisePhaseId === numberedPhasedId
        )
      };
    });
  }
});

const mapDispatch: MapDispatchToPropsType = {
  selectSystem,
  deselectSystem,
  loadTenantSystems,
  addTenantPhaseManualEntry,
  updateTenantPhaseManualEntry,
  deleteTenantPhaseManualEntry
};

export default connectStore(mapState, mapDispatch)(SystemManagement);

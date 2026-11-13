import React, { useState } from 'react';
import { useAuth } from '@/libs/auth/useAuth';
import { DashboardTemplate } from '@/templates';
import {
  HudHeader,
  NodeTelemetryCard,
  TreasuryTelemetryCard,
  TerminalStreamSection,
  SubSchematicSection,
  FooterTelemetryTable,
} from '@/organisms';
import { FooterInfoBar } from '@/molecules';
import { UnderConstructionOverlay } from '../atoms';

export const DashboardPage: React.FC = () => {
  const { company } = useAuth();
  const [selectedSec, setSelectedSec] = useState<number>(4);
  const [codeConsoleActive, setCodeConsoleActive] = useState<Record<string, boolean>>({
    diag: false,
    metrics: false,
    chart: false,
    treasury: false,
  });

  if (!company) {
    return null;
  }

  const toggleConsole = (key: string) => {
    setCodeConsoleActive((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const franchise = company.starterLicenseId || company.facilities?.[0]?.facilityType || 'GENERAL';
  const currentDirectory = `//SYSTEM/USERS/${company.companyId}/NODE_${company.startingNodeId}/P8.4807/LOGISTICS.44+`;

  return (
    <DashboardTemplate
      header={<UnderConstructionOverlay><HudHeader /></UnderConstructionOverlay>}
      telemetry={
        <>
          <UnderConstructionOverlay>
            <NodeTelemetryCard nodeId={company.startingNodeId} />
            <TreasuryTelemetryCard
              cashBalance={company.cashBalance}
              companyName={company.name}
              franchise={franchise}
              reputation={company.reputation ?? 100}
              consoleActive={Boolean(codeConsoleActive['treasury'])}
              onToggleConsole={() => toggleConsole('treasury')}
            />
          </UnderConstructionOverlay>
        </>
      }
      terminalStream={
        <UnderConstructionOverlay>
          <TerminalStreamSection
            startingNodeId={company.startingNodeId}
            licenseName={franchise}
          />
        </UnderConstructionOverlay>
      }
      schematic={
        <UnderConstructionOverlay>
          <SubSchematicSection
            selectedSec={selectedSec}
            onSelectSec={setSelectedSec}
            codeConsoleActive={codeConsoleActive}
            onToggleConsole={toggleConsole}
          />
        </UnderConstructionOverlay>
      }
      footer={<UnderConstructionOverlay><FooterTelemetryTable /></UnderConstructionOverlay>}
      footerInfo={<FooterInfoBar currentDirectory={currentDirectory} />}
    />
  );
};

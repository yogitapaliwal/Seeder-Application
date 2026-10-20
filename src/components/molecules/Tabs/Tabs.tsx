import { useTheme } from '@mui/material/styles';

import Button from '@/components/atoms/Button';
import { getTabButtonStyles, TabsContainer } from '@/components/molecules/Tabs/Tabs.style';
import { TabsProps } from '@/components/molecules/Tabs/Tabs.types';

const Tabs = ({ tabs, activeTab, onChange, sx }: TabsProps) => {
  const theme = useTheme();

  return (
    <TabsContainer sx={sx}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
          <Button
            key={tab.value}
            variant="text"
            size="medium"
            onClick={() => onChange(tab.value)}
            sx={getTabButtonStyles(theme, isActive)}
          >
            {tab.label}
          </Button>
        );
      })}
    </TabsContainer>
  );
};

export default Tabs;

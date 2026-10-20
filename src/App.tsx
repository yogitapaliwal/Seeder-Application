import { Routes, Route, Navigate } from 'react-router-dom';
import MainTemplate from '@/components/templates/MainTemplate/MainTemplate';
import HomePage from '@/pages/Home/HomePage';
import NewCashKickPage from '@/pages/NewCashKick/NewCashKickPage';
import CashAccelerationPage from '@/pages/CashAcceleration/CashAccelerationPage';
import { ROUTES } from '@/routes/paths';
import SelectContracts from '@/pages/NewCashKick/components/SelectContracts/SelectContracts';
import ReviewContracts from '@/pages/NewCashKick/components/ReviewContracts/ReviewContracts';
import MyContracts from '@/pages/CashAcceleration/components/MyContracts/MyContracts';
import MyCashKicks from '@/pages/CashAcceleration/components/MyCashKicks/MyCashKicks';

const App = () => {
  return (
    <Routes>
      <Route element={<MainTemplate />}>
        <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.HOME} replace />} />
        <Route path={ROUTES.HOME} element={<HomePage />} />

        <Route path={ROUTES.CASH_ACCELERATION} element={<CashAccelerationPage />}>
          <Route index element={<Navigate to={ROUTES.CASH_ACCELERATION_CONTRACTS} replace />} />
          <Route path="contracts" element={<MyContracts />} />
          <Route path="cash-kicks" element={<MyCashKicks />} />
        </Route>

        <Route path={ROUTES.NEW_CASH_KICK} element={<NewCashKickPage />}>
          <Route index element={<Navigate to={ROUTES.NEW_CASH_KICK_SELECT} replace />} />
          <Route path="select" element={<SelectContracts />} />
          <Route path="review" element={<ReviewContracts />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;

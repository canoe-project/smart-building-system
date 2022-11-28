import { BuildingFloor } from '@/section/BuildingFloor';
import { DashBoard } from '@/section/DashBoard';

const Index = () => {
  return (
    <div className="relative flex w-full h-full overflow-scroll scrollbar-hide">
      <DashBoard></DashBoard>
      <BuildingFloor></BuildingFloor>
    </div>
  );
};

export default Index;

import { useState, useEffect, Fragment } from 'react';

import { useRouter } from 'next/router';
// import { useDispatch, useSelector } from 'react-redux';

// import { RootState } from 'store/store';
// import { setStation } from 'store/subwayStationReducer';

type StationType = {
  stationName: string;
  stationNumber: number;
};

type Props = {
  line: number;
  group: StationType[];
};

// const onOverEffect = (e: MouseEvent<HTMLElement>) => {
//   const rounter = e.currentTarget.querySelector('div.ronud') as HTMLElement;
//   const p = e.currentTarget.querySelector('p') as HTMLElement;
//   rounter.style.backgroundColor = '#ffffff';
//   p.style.backgroundColor = '#F7F6F9';
// };

// const onOutEffect = (e: MouseEvent<HTMLLIElement>) => {
//   const rounter = e.currentTarget.querySelector('div.ronud') as HTMLElement;
//   const p = e.currentTarget.querySelector('p') as HTMLElement;
//   rounter.style.backgroundColor = '#B8C0FF';
//   p.style.backgroundColor = '#ffffff';
// };

// const onListClick = (
//   e: MouseEvent<HTMLParagraphElement>,
//   station: StationType,
//   dispatch: Function
// ) => {
//   return dispatch(setStation(station));
// };

const StationList = ({ line, group }: Props) => {
  const [stationGroup, setStationGroup] = useState<StationType[]>([]);
  const [isClick, setClick] = useState(false);

  // const subwayState = useSelector((state: RootState) => state.subwayStation);

  // const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setStationGroup(group);
  }, [group]);

  return (
    <Fragment>
      <div
        className={`flex flex-row `}
        onClickCapture={() => {
          setClick((preIsClick) => !preIsClick);
        }}
      >
        <p className={`text-2xl font-DoHyeon mr-1`} key={`${line}-title`}>
          {`${line + 1} 호선`}
        </p>
        <p
          className={`self-center text-base font-NanumGothic font-bold text-subtitle mr-1`}
        >{`${line + 1} line`}</p>
        <span
          className={`text-2xs self-center material-symbols-outlined ${
            isClick ? 'text-darkBlue ' : 'text-unSelectedFont -rotate-90'
          }`}
        >
          expand_more
        </span>
      </div>
      <ul
        className={`max-h-[19.5em] overflow-scroll scrollbar-hide ${
          isClick ? 'h-full' : 'h-0'
        }`}
      >
        {stationGroup.map((station) => {
          return (
            <li
              className={` text-unSelectedFont flex flex-row relative`}
              key={station.stationNumber}
            >
              <div
                className={`z-20 rounded-full w-5 h-5 border-4 border-darkBlue self-center ronud`}
              ></div>
              <div className={`w-1 h-full left-2 absolute bg-darkBlue`}></div>
              <p
                onClick={async () => {
                  await router.push(
                    `/?id=${station.stationNumber}`,
                    undefined,
                    {
                      shallow: false,
                    }
                  );
                  await router.reload();
                }}
                className={`my-4 list w-40 h-11 items-center flex rounded-md pl-1 hover:ml-2 hover:bg-selectedIcon`}
              >{`${station.stationName}`}</p>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};

export { StationList };

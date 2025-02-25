import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; // 스타일 시트를 임포트하는 것을 잊지 마세요

const Graph = () => {
  return (
    <div style={{ width: 100, height: 100 }}>
      <CircularProgressbarWithChildren
        value={66}
        styles={buildStyles({
          pathColor: `rgba(62, 152, 199, ${66 / 100})`, // 여기에서 진행 막대의 색상을 설정
          textColor: "#f88",
          trailColor: "#d6d6d6", // 배경 막대의 색상
          backgroundColor: "#3e98c7", // 원형 바의 배경색 (필요시)
        })}
      >
        <img
          style={{ width: 40, marginTop: -5 }}
          src="https://i.imgur.com/b9NyUGm.png"
          alt="doge"
          
        />
        <div style={{ fontSize: 12, marginTop: -5 }}>
          <strong>66%</strong> mate
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default Graph;

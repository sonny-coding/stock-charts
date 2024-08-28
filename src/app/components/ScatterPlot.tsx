// "use client";

// import { wbData } from "@/data";
// import { scaleLinear, scaleLog, scaleSqrt, scaleOrdinal } from "@visx/scale";
// import { extent, format } from "d3";
// import { Circle } from "@visx/shape";
// import { Group } from "@visx/group";
// import { Axis, AxisLeft } from "@visx/axis";
// import { GridColumns } from "@visx/grid";
// import { LegendOrdinal } from "@visx/legend";
// import ParentSize from "@visx/responsive/lib/components/ParentSize";

// type ScatterPlotProps = {
//   data: any; // Replace 'any' with the actual type of 'wbData'
//   width: number;
//   height: number;
//   margin: {
//     top: number;
//     left: number;
//     right: number;
//     bottom: number;
//   };
// };

// const ScatterPlot = ({
//   data = wbData,
//   width = 800,
//   height = 500,
//   margin = { top: 30, left: 60, right: 40, bottom: 40 },
// }: ScatterPlotProps) => {
//   const innerWidth = width - margin.left - margin.right;
//   const innerHeight = height - margin.top - margin.bottom;

//   // accessor functions
//   const x = (d: any) => d.gdpPerCap;
//   const y = (d: any) => d.lifeExpectancy;
//   const radius = (d: any) => d.population;
//   const color = (d: any) => d.region;

//   // scales
//   const xScale = scaleLog({
//     range: [margin.left, innerWidth + margin.left],
//     domain: extent(data, x),
//   });

//   const yScale = scaleLinear({
//     range: [innerHeight + margin.top, margin.top],
//     domain: extent(data, y),
//     nice: true,
//   });

//   const colorScale = scaleOrdinal({
//     range: ["#ff8906", "#3da9fc", "#ef4565", "#7f5af0", "#2cb67d"],
//     domain: [...new Set(data.map(color))],
//   });

//   const rScale = scaleSqrt({
//     range: [3, 30],
//     domain: extent(data, radius),
//   });

//   data = data.sort((a, b) => b.population - a.population);
//   return (
//     <>
//       {/* <LegendOrdinal
//         scale={colorScale}
//         direction="row"
//         shape="circle"
//         style={{
//           display: "flex",
//           justifyContent: "space-around",
//         }}
//       /> */}

//       <svg width={width} height={height}>
//         <AxisLeft scale={yScale} left={margin.left} label="Life expectancy" />
//         <Axis
//           orientation="top"
//           scale={xScale}
//           top={margin.top}
//           tickFormat={format("$~s")}
//           numTicks={2}
//           tickStroke="transparent"
//           stroke="transparent"
//         />
//         <Axis
//           orientation="bottom"
//           scale={xScale}
//           top={innerHeight + margin.top}
//           tickFormat={format("$~s")}
//           numTicks={2}
//           label="GDP per cap"
//         />
//         <GridColumns
//           top={margin.top}
//           scale={xScale}
//           height={innerHeight}
//           strokeOpacity={0.3}
//           pointerEvents="none"
//           numTicks={2}
//         />
//         <Group pointerEvents="none">
//           {data.map((point, i) => (
//             <Circle
//               key={i}
//               cx={xScale(x(point))}
//               cy={yScale(y(point))}
//               r={rScale(radius(point))}
//               fill={colorScale(color(point))}
//               fillOpacity={0.8}
//             />
//           ))}
//         </Group>
//       </svg>
//     </>
//   );
// };

// const ScatterPlotWrapper = () => (
//   <ParentSize>
//     {({ width, height }) => <ScatterPlot width={width} height={height} />}
//   </ParentSize>
// );

// export default ScatterPlotWrapper;

"use client";

import * as React from "react";
import { DualRangeSlider } from "@/app/ui/dual-range-slider";
import { useState } from "react";

type DualRangeSliderValue = [number, number];

type DualRangeSliderCustomProps = {
  values: number[];
  setValues: (values: DualRangeSliderValue) => void;
  min?: number;
  max?: number;
  step?: number;
};

const DualRangeSliderCustom: React.FC<DualRangeSliderCustomProps> = ({
  values,
  setValues,
  min = 0,
  max = 100,
  step = 1,
}) => {
  return (
    <div className="w-full space-y-5 px-10 pt-4">
      <DualRangeSlider
        label={(value) => <span>{value}℃</span>}
        value={values}
        onValueChange={setValues}
        min={values[0]}
        max={values[1]}
        step={1}
      />
    </div>
  );
};

export default DualRangeSliderCustom;

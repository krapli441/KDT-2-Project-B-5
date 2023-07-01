// 리액트 라이브러리
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

// 외부 라이브러리
import {
  Box,
  Input,
  Button,
  Text,
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";
// 리액트 컴포넌트

function CreateAccountCheckBox() {
  const [checkedItems, setCheckedItems] = React.useState([
    false,
    false,
    false,
    false,
  ]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !checkedItems[index];
    setCheckedItems(updatedCheckedItems);
  };

  return (
    <>
      <Box
        className="checkBox"
        border={"1px solid black"}
        borderRadius={"5px"}
        padding={"10px"}
      >
        <Checkbox
          isChecked={allChecked}
          isIndeterminate={isIndeterminate}
          onChange={() => {
            const updatedCheckedItems = checkedItems.map(() => !allChecked);
            setCheckedItems(updatedCheckedItems);
          }}
        >
          모두 확인하였으며, 동의합니다.
        </Checkbox>
        <Stack pl={6} mt={1} spacing={1}>
          <Checkbox
            isChecked={checkedItems[0]}
            onChange={() => handleCheckboxChange(0)}
          >
            [필수] 아스팔트 이용약관 동의
          </Checkbox>
          <Checkbox
            isChecked={checkedItems[1]}
            onChange={() => handleCheckboxChange(1)}
          >
            [필수] 개인정보 제 3자 제공 동의
          </Checkbox>
          <Checkbox
            isChecked={checkedItems[2]}
            onChange={() => handleCheckboxChange(2)}
          >
            [선택] 마케팅 목적의 개인정보 수집 및 이용 동의
          </Checkbox>
          <Checkbox
            isChecked={checkedItems[3]}
            onChange={() => handleCheckboxChange(3)}
          >
            [선택] 광고성 정보 수신 동의
          </Checkbox>
        </Stack>
      </Box>
    </>
  );
}
export default CreateAccountCheckBox;

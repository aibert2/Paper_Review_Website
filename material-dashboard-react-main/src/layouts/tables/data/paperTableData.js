import React from "react";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import MDTypography from "components/MDTypography";
import Tooltip from "@mui/material/Tooltip";

const EllipsisCell = ({ value }) => (
  <Tooltip title={value} arrow>
    <span
      style={{
        display: "inline-block",
        maxWidth: 120,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {value}
    </span>
  </Tooltip>
);

EllipsisCell.propTypes = {
  value: PropTypes.string.isRequired,
};

const CheckboxCell = ({ row, onChange, checked }) => (
  <Checkbox checked={checked} onChange={() => onChange(row.index)} color="primary" size="small" />
);

CheckboxCell.propTypes = {
  row: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

const TitleCell = ({ value }) => (
  <Tooltip title={value} arrow>
    <span
      style={{
        display: "inline-block",
        maxWidth: 180,
        whiteSpace: "normal",
        wordBreak: "break-all",
        overflow: "hidden",
        textOverflow: "ellipsis",
        lineHeight: 1.3,
        maxHeight: "3.9em", // 3行
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        display: "-webkit-box",
      }}
    >
      {value}
    </span>
  </Tooltip>
);

TitleCell.propTypes = {
  value: PropTypes.string.isRequired,
};

// 论文表格字段定义，优化顺序和宽度
const columns = [
  {
    Header: <span style={{ whiteSpace: "nowrap" }}>选择</span>,
    accessor: "checkbox",
    width: "6%",
    align: "center",
    Cell: ({ row }) => row.original.checkbox,
  },
  { Header: "日期", accessor: "date", width: "8%", align: "center" },
  { Header: "标题", accessor: "title", width: "22%", align: "left", Cell: TitleCell },
  {
    Header: "作者",
    accessor: "authors",
    width: "10%",
    align: "left",
    Cell: EllipsisCell,
  },
  {
    Header: "摘要",
    accessor: "abstract",
    width: "15%",
    align: "left",
    Cell: EllipsisCell,
  },
  { Header: "主分类", accessor: "primary_category", width: "7%", align: "center" },
  { Header: "主页", accessor: "abs_url", width: "7%", align: "center" },
  { Header: "PDF", accessor: "pdf_url", width: "7%", align: "center" },
];

export default columns;

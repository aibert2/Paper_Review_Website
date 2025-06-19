/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import columns from "layouts/tables/data/paperTableData";
import React, { useState, useEffect } from "react";

function Tables() {
  const [rows, setRows] = useState([]);

  // 多选与弹窗相关状态
  const [selectedRows, setSelectedRows] = useState([]);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

  // 审稿内容结构化模板
  const defaultReview = {
    summary: "本文提出了一种新的自动化审稿系统……（示例内容）",
    strengths: "- 结构清晰\n- 方法新颖\n- 实验充分",
    weaknesses: "- 数据集较小\n- 缺乏消融实验",
    questions: "- 是否可以扩展到其他领域？",
    soundness: "3 good",
    presentation: "4 excellent",
    contribution: "3 good",
    rating: "8 accept, good paper",
    decision: "Accept",
    reasons: "创新性强，结构合理，实验充分，具有较高学术价值。",
    email: "",
  };
  // 多论文审稿建议
  const [reviews, setReviews] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // 一键审稿按钮点击事件
  const handleReviewClick = () => {
    // 生成与选中论文数相同的审稿建议
    if (selectedRows.length === 0) return;
    setReviews(selectedRows.map(() => ({ ...defaultReview })));
    setReviewDialogOpen(true);
  };

  // 关闭弹窗
  const handleDialogClose = () => {
    setReviewDialogOpen(false);
  };

  // 审稿内容变更（多论文）
  const handleReviewChange = (idx, key) => (e) => {
    const newReviews = [...reviews];
    newReviews[idx][key] = e.target.value;
    setReviews(newReviews);
  };

  // 发送审稿
  const handleSend = () => {
    setReviewDialogOpen(false);
    setSnackbarOpen(true);
    // 这里可扩展为批量发送邮件，每个review可带不同邮箱
    // reviews.forEach((review, idx) => sendMail(review, rows[selectedRows[idx]].authorsEmail))
  };

  // 多选逻辑
  const handleSelectRow = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // 加载真实论文数据
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetch("/paperlist.json")
      .then((res) => res.json())
      .then((data) => {
        const formattedRows = data.map((item, idx) => ({
          date: item.Date,
          title: item.Title,
          authors: item.Authors,
          abstract: item.Abstract,
          primary_category: item.primary_category,
          abs_url: (
            <MDTypography
              component="a"
              href={item.abs_url}
              target="_blank"
              rel="noopener noreferrer"
              color="info"
            >
              链接
            </MDTypography>
          ),
          pdf_url: (
            <MDTypography
              component="a"
              href={item.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              color="info"
            >
              PDF
            </MDTypography>
          ),
          action: (
            <MDTypography component="span" color="info">
              选择
            </MDTypography>
          ),
          // 多选勾选框
          checkbox: (
            <Checkbox
              checked={selectedRows.includes(idx)}
              onChange={() => handleSelectRow(idx)}
              color="primary"
              size="small"
            />
          ),
        }));
        setRows(formattedRows);
      });
  }, [selectedRows]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  论文列表
                </MDTypography>
                <MDButton
                  color="success"
                  onClick={handleReviewClick}
                  disabled={selectedRows.length === 0}
                >
                  一键审稿
                </MDButton>
              </MDBox>
              <MDBox pt={3} sx={{ fontSize: "0.8rem", padding: 0, overflowX: "auto" }}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* 审稿弹窗 */}
      <Dialog open={reviewDialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>结构化审稿意见</DialogTitle>
        <DialogContent dividers>
          {selectedRows.map((rowIdx, idx) => (
            <MDBox key={rowIdx} mb={4} p={2} border={1} borderColor="grey.200" borderRadius={2}>
              <MDTypography variant="subtitle2" color="info" mb={1}>
                论文标题：{rows[rowIdx]?.title}
              </MDTypography>
              <MDTypography variant="caption" color="text" mb={1}>
                作者：{rows[rowIdx]?.authors}
              </MDTypography>
              <TextField
                label="Summary"
                multiline
                minRows={2}
                fullWidth
                margin="normal"
                value={reviews[idx]?.summary || ""}
                onChange={handleReviewChange(idx, "summary")}
              />
              <TextField
                label="Strengths"
                multiline
                minRows={2}
                fullWidth
                margin="normal"
                value={reviews[idx]?.strengths || ""}
                onChange={handleReviewChange(idx, "strengths")}
              />
              <TextField
                label="Weaknesses"
                multiline
                minRows={2}
                fullWidth
                margin="normal"
                value={reviews[idx]?.weaknesses || ""}
                onChange={handleReviewChange(idx, "weaknesses")}
              />
              <TextField
                label="Questions"
                multiline
                minRows={2}
                fullWidth
                margin="normal"
                value={reviews[idx]?.questions || ""}
                onChange={handleReviewChange(idx, "questions")}
              />
              <TextField
                label="Soundness"
                fullWidth
                margin="normal"
                value={reviews[idx]?.soundness || ""}
                onChange={handleReviewChange(idx, "soundness")}
              />
              <TextField
                label="Presentation"
                fullWidth
                margin="normal"
                value={reviews[idx]?.presentation || ""}
                onChange={handleReviewChange(idx, "presentation")}
              />
              <TextField
                label="Contribution"
                fullWidth
                margin="normal"
                value={reviews[idx]?.contribution || ""}
                onChange={handleReviewChange(idx, "contribution")}
              />
              <TextField
                label="Rating"
                fullWidth
                margin="normal"
                value={reviews[idx]?.rating || ""}
                onChange={handleReviewChange(idx, "rating")}
              />
              <TextField
                label="Paper Decision (Accept/Reject)"
                fullWidth
                margin="normal"
                value={reviews[idx]?.decision || ""}
                onChange={handleReviewChange(idx, "decision")}
              />
              <TextField
                label="Reasons"
                multiline
                minRows={2}
                fullWidth
                margin="normal"
                value={reviews[idx]?.reasons || ""}
                onChange={handleReviewChange(idx, "reasons")}
              />
              <TextField
                label="作者邮箱（可选）"
                fullWidth
                margin="normal"
                value={reviews[idx]?.email || ""}
                onChange={handleReviewChange(idx, "email")}
              />
            </MDBox>
          ))}
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleDialogClose} color="secondary">
            取消
          </MDButton>
          <MDButton onClick={handleSend} color="success">
            发送
          </MDButton>
        </DialogActions>
      </Dialog>
      {/* 发送成功提示 */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          审稿意见已发送
        </Alert>
      </Snackbar>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;

"use client";

import type { AlertColor } from "@mui/material";
import {
  Alert,
  Box,
  Button,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { MuiFileInput } from "mui-file-input";
import { useEffect, useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [message, setMessage] = useState("");
  const result = (severity: AlertColor, message: string) => {
    setOpen(true);
    setSeverity(severity);
    setMessage(message);
  };
  type MonthlySummary = {
    monthly_date: string;
    monthly_price: number;
  };
  const [monthlySummaries, setMonthlySummaries] = useState<MonthlySummary[]>(
    [],
  );

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/inventory/summary/")
      .then((res) => res.data)
      .then((data) => {
        setMonthlySummaries(data);
      });
  }, []);

  const [fileSync, setFileSync] = useState<File | null>(null);
  const onChangeFileSync = (newFile: File | null) => {
    setFileSync(newFile);
  };

  const doAddSync = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!fileSync) {
      result("error", "ファイルを選択してください");
      return;
    }
    const params = {
      file: fileSync,
    };
    axios
      .post("http://localhost:8000/api/inventory/sync/", params, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        result("success", "同期ファイルが登録されました");
      })
      .catch((error) => {
        console.log(error);
        result("error", "同期ファイルの登録に失敗しました");
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
      <Typography variant="h5">売上一括登録</Typography>
      <Box m={2}>
        <Typography variant="subtitle1">同期でファイル取込</Typography>
        <MuiFileInput value={fileSync} onChange={onChangeFileSync} />
        <Button variant="contained" onClick={doAddSync}>
          登録
        </Button>
      </Box>
      <Box m={2}>
        <Typography variant="subtitle1">年月ごとの売上数集計</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>処理月</TableCell>
                <TableCell>合計数量</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {monthlySummaries.map((data: MonthlySummary) => (
                <TableRow key={data.monthly_date}>
                  <TableCell>{data.monthly_date}</TableCell>
                  <TableCell>{data.monthly_price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

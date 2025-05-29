"use client";

import AddIcon from "@mui/icons-material/Add";
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
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import productsData from "./sample/dummy_products.json";

type ProductData = {
  id: number | null;
  name: string;
  price: number;
  description: string;
};

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>();

  // 読込データを保持
  const [data, setData] = useState<Array<ProductData>>([]);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [message, setMessage] = useState("");
  const result = (severity: AlertColor, message: string) => {
    setOpen(true);
    setSeverity(severity);
    setMessage(message);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setData(productsData as ProductData[]);
  }, []);

  const [id, setId] = useState<number | null>(0);
  // submit時のactionを分岐させる
  const [action, setAction] = useState<string>("");
  type FormInput = {
    name: string;
    price: number | string;
    description: string;
  };

  const onSubmit = (event: FormInput): void => {
    const data: ProductData = {
      id: id,
      name: event.name,
      price: Number(event.price),
      description: event.description,
    };
    // actionによってHTTPメソッドと使用するパラメーターを切り替える
    if (action === "add") {
      handleAdd(data);
    } else if (action === "update") {
      if (data.id === null) {
        return;
      }
      handleEdit(data);
    } else if (action === "delete") {
      if (data.id === null) {
        return;
      }
      handleDelete(data.id);
    }
  };

  // 新規登録処理、新規登録行の表示状態を保持
  const handleShowNewRow = () => {
    console.log("handleShowNewRow");
    setId(null);
    reset({
      name: "",
      price: "0",
      description: "",
    });
  };
  const handleAddCancel = () => {
    console.log("handleAddCancel");
    setId(0);
  };
  const handleAdd = (data: ProductData) => {
    result("success", "商品が登録されました");
    console.log("handleAdd", data);
    setId(0);
  };

  // 更新・削除処理、更新・削除行の表示状態を保持
  const handleEditRow = (id: number | null) => {
    console.log("handleEditRow", id);
    const selectedProduct: ProductData = data.find(
      (v) => v.id === id,
    ) as ProductData;
    setId(selectedProduct.id);
    reset({
      name: selectedProduct.name,
      price: selectedProduct.price,
      description: selectedProduct.description,
    });
  };
  const handleEditCancel = () => {
    console.log("handleEditCancel");
    setId(0);
  };
  const handleEdit = (data: ProductData) => {
    result("success", "商品が更新されました");
    console.log("handleEdit", data);
    setId(0);
  };
  const handleDelete = (id: number) => {
    result("success", "商品が削除されました");
    console.log("handleDelete", id);
    setId(0);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
      <Typography variant="h5">商品一覧</Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => handleShowNewRow()}
      >
        商品を追加する
      </Button>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ height: 400, width: "100%" }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>商品ID</TableCell>
                <TableCell>商品名</TableCell>
                <TableCell>単価</TableCell>
                <TableCell>説明</TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {id === null ? (
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <input
                      type="text"
                      id="name"
                      {...register("name", { required: true, maxLength: 100 })}
                    />
                    {errors.name && (
                      <div>100文字以内の商品名を入力してください</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      id="price"
                      {...register("price", {
                        required: true,
                        min: 1,
                        max: 99999999,
                      })}
                    />
                    {errors.price && (
                      <div>1から99999999の数値を入力してください</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      id="description"
                      {...register("description")}
                    />
                  </TableCell>
                  <TableCell />
                  <TableCell>
                    <button type="button" onClick={() => handleAddCancel()}>
                      キャンセル
                    </button>
                    <button type="submit" onClick={() => setAction("add")}>
                      登録する
                    </button>
                  </TableCell>
                </TableRow>
              ) : null}
              {data.map((data: ProductData) =>
                id === data.id ? (
                  <TableRow key={data.id}>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>
                      <input
                        type="text"
                        id="name"
                        {...register("name", {
                          required: true,
                          maxLength: 100,
                        })}
                      />
                      {errors.name && (
                        <div>100文字以内の商品名を入力してください</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        id="price"
                        {...register("price", { min: 1, max: 99999999 })}
                      />
                      {errors.price && (
                        <div>1から99999999の数値を入力してください</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        id="description"
                        {...register("description")}
                      />
                    </TableCell>
                    <TableCell />
                    <TableCell>
                      <button type="button" onClick={() => handleEditCancel()}>
                        キャンセル
                      </button>
                      <button type="submit" onClick={() => setAction("update")}>
                        更新する
                      </button>
                      <button type="submit" onClick={() => setAction("delete")}>
                        削除する
                      </button>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={data.id}>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.price}</TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell>
                      <Link href={`/inventory/products/${data.id}`}>
                        在庫処理
                      </Link>
                    </TableCell>
                    <TableCell>
                      <button
                        type="button"
                        onClick={() => handleEditRow(data.id)}
                      >
                        更新・削除
                      </button>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

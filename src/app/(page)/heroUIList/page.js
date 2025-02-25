"use client"
import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  getKeyValue,
} from "@heroui/react";

import {Select, SelectSection, SelectItem} from "@heroui/select";

import useSWR from "swr";
import {swrFetch}  from "@/common/fetch";  
  

export default function heroUIList(){

  const [page, setPage] = React.useState(1); 
  const [rowsPerPage, setrowsPerPage] = React.useState(2); 
  

  let param =  {params : {
    KIND_DVCD : 11
    , YM : 202502
  },
  common : {
    limit: rowsPerPage,
    page : page,
  } 
};

  const {data,  isLoading} = useSWR(["schedule",param],  swrFetch  , {
    keepPreviousData: true,
  }); 

  const headers = [
    {key: "reg_dt",label:"일자"},
    {key: "nickname",label:"작성자"},
    {key: "subject",label:"제목"},
    {key: "content",label:"내용"},
  ] 
  const counts = [
    {key: "2",label:"2"},
    {key: "5",label:"5"},
    {key: "10",label:"10"},
    {key: "20",label:"20"},
  ] 
  
  const selChg = (e)=>{
    setrowsPerPage(e.target.value);
    setPage(1);
  }

  const pages = React.useMemo(() => {  
    return data?.data?.totalPage  != undefined ?   data?.data?.totalPage : 0;
  }, [  data?.data?.totalPage , rowsPerPage ]); 

  const loadingState = isLoading || data?.data?.posts.length === 0 ? "loading" : "idle";

  return (
    <div> 
     <Select className="max-w-xs" label="건수" onChange={selChg} defaultSelectedKeys={["2"]}>
      {counts.map((cnt) => (
        <SelectItem key={cnt.key}>{cnt.label}</SelectItem>
      ))}
    </Select>  
    <Table
      aria-label="일정목록"
      selectionMode="multiple"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader> 
        {headers.map((header) =>
          <TableColumn key={header.key}>{header.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={data?.data?.posts ?? []}
        loadingContent={<Spinner />}
        loadingState={loadingState}
        emptyContent={"일정 데이터가 없습니다."}
      >
        {(item) => (
          <TableRow key={item?.ps_id}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
    </div>
  );
}



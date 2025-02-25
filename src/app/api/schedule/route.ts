import dbConnection from '@/services/mysql'
import { NextRequest, NextResponse } from 'next/server'

// Type import
import { Connection, FieldPacket, RowDataPacket } from 'mysql2/promise'
import { PageInfoType, PostType } from '@/types/postType'

interface schedulType {
  params:{
    KIND_DVCD: string;
    YM?: string;
  },
  common:{
    page: string;
    limit: number;
  }

}

export async function POST(request: NextRequest) {
  // 페이지당 받아올 게시글 수
  let limit = 5

  const { params,common } : schedulType  = await request.json();
  let queryString:  string | null   = (common?.page == undefined? null : common?.page);  
  limit = (common?.limit == undefined ? limit : common?.limit);

  // 반환할 데이터
  const returnData: { data: PageInfoType } = {
    data: {
      posts: [],
      count: 0,
      pageSize: limit,
      currentPage: 0,
      totalPage: 0,
    },
  }

  // 전체 게시글 조회
  try {
    const db: Connection = await dbConnection()
    const sql = `select * from posts where del = 0 and  substr(reg_dt,1,6) = ?  order by ps_id desc;`
    const [resultAll, field]: [PostType[], FieldPacket[]] =
      await db.execute(sql, [
        params.YM, 
      ])

    if (Array.isArray(resultAll)) {
      // 전체 게시글 갯수
      returnData.data.count = resultAll.length
      // 전체 페이지 갯수 (전체 게시글 / limit을 올림한 값)
      returnData.data.totalPage = Math.ceil(resultAll.length / limit)
      // 현재 페이지 번호 (queryString 값. 없으면 Number(null) = 0)
      returnData.data.currentPage = Number(queryString ? queryString : 1)
    } 
    
    // 쿼리스트링 있으면 pagination 처리
    if (queryString !== null) {
      // 몇 번째 게시글부터 limit만큼 가져올 건지. (페이지 - 1) * 가져올 개수
      const offset = (Number(queryString) - 1) * Number(limit)
      const sql =
        'select * from posts where del = 0 order by ps_id desc limit ? offset ?'
      const [result, field]: [PostType[], FieldPacket[]] = await db.execute(
        sql,
        [`${limit}`, `${offset}`],
      )

      returnData.data.posts = result
      await db.end()
    } else {
      // 쿼리스트링 없으면, 즉 페이지 정보 없으면 0페이지. 가장 초기 페이지 데이터를 가져온다.
      const sql =
        "select * from posts where del = 0  and  substr( reg_dt ,1,6) = ? order by ps_id desc limit ?"
      const [result, field]: [PostType[], FieldPacket[]] = await db.execute(
        sql,
        [
          params.YM, 
          `${limit}`
        ],
      )
      returnData.data.posts = result
      await db.end()
    }
    return NextResponse.json(returnData)
  } catch (error) {
    // 타입 가드 처리
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error,
        },
        { status: 500 },
      )
    }
  }
}


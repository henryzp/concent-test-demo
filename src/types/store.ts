import { ICtx, StateType, ReducerType, MODULE_VOID, MODULE_DEFAULT, cst } from 'concent';

/** tihai模块相关 */
import tihaiState from '@/pages/tihai/model/state';
import * as tihaiRd from '@/pages/tihai/model/reducer';

/**
 * tihai:
 * 推导模块各个文件的类型组装RootState,RootReducer, RootComputed
 * 后续模块下添加各种新的函数或属性，组件都能智能感知到
 */
export type TihaiM = 'tihai';
export type TihaiState = StateType<typeof tihaiState>;
export type TihaiRd = ReducerType<typeof tihaiRd>;

/** 构造根State类型 */
export interface RootState {
  [cst.MODULE_VOID]: {};
  [cst.MODULE_GLOBAL]: {};
  [cst.MODULE_DEFAULT]: {};
  tihai: TihaiState;
}

/** 构造根Reducer类型 */
export interface RootReducer {
  [cst.MODULE_VOID]: {};
  [cst.MODULE_GLOBAL]: {};
  [cst.MODULE_DEFAULT]: {};
  tihai: TihaiRd;
}

/** 构造根Computed类型 */
export interface RootComputed {
  [cst.MODULE_VOID]: {};
  [cst.MODULE_GLOBAL]: {};
  [cst.MODULE_DEFAULT]: {};
  tihai: {};
}

export type Modules = keyof RootState;

// ********************************
// 一些常用的基于Ctx封装的辅助类型
// ********************************

/** 属于某个模块 CtxM<P, M, Se, RefCu> */
export type CtxM<P = {}, M extends Modules = MODULE_DEFAULT, Se = {}, RefCu = {}> = ICtx<
  RootState,
  RootReducer,
  RootComputed,
  P,
  {},
  M,
  MODULE_VOID,
  Se,
  RefCu
>;

/** 属于某个模块，扩展了私有状态时 CtxMS<P, M, St, Se, RefCu>*/
export type CtxMS<P = {}, M extends Modules = MODULE_DEFAULT, St = {}, Se = {}, RefCu = {}> = ICtx<
  RootState,
  RootReducer,
  RootComputed,
  P,
  St,
  M,
  MODULE_VOID,
  Se,
  RefCu
>;

/** 属于某个模块，连接了其他模块 CtxMConn<P, M, Conn, Se, RefCu> */
export type CtxMConn<
  P = {},
  M extends Modules = MODULE_DEFAULT,
  Conn extends Modules = MODULE_VOID,
  Se = {},
  RefCu = {}
> = ICtx<RootState, RootReducer, RootComputed, P, {}, M, Conn, Se, RefCu>;

/** 属于某个模块，扩展了私有状态，连接了其他模块 CtxMSConn<P, M, St, Conn, Se, RefCu>  */
export type CtxMSConn<
  P = {},
  M extends Modules = MODULE_DEFAULT,
  St = {},
  Conn extends Modules = MODULE_VOID,
  Se = {},
  RefCu = {}
> = ICtx<RootState, RootReducer, RootComputed, P, St, M, Conn, Se, RefCu>;

/** 扩展了私有状态，连接了其他模块 CtxMSConn<P, St, Conn, Se, RefCu>  */
export type CtxSConn<P = {}, St = {}, Conn extends Modules = MODULE_VOID, Se = {}, RefCu = {}> = ICtx<
  RootState,
  RootReducer,
  RootComputed,
  P,
  St,
  MODULE_DEFAULT,
  Conn,
  Se,
  RefCu
>;

/** 连接了其他模块 CtxConn<P, Conn, Se, RefCu> */
export type CtxConn<P = {}, Conn extends Modules = MODULE_VOID, Se = {}, RefCu = {}> = ICtx<
  RootState,
  RootReducer,
  RootComputed,
  P,
  {},
  MODULE_DEFAULT,
  Conn,
  Se,
  RefCu
>;

// default系列，没有指定连接模块的组件默认属于$$default模块
export type CtxDe<P = {}, Se = {}, RefCu = {}> = CtxM<P, MODULE_DEFAULT, Se, RefCu>;
export type CtxDeS<P = {}, St = {}, Se = {}, RefCu = {}> = CtxMS<P, MODULE_DEFAULT, St, Se, RefCu>;
export type CtxDeSConn<P = {}, St = {}, Conn extends Modules = MODULE_VOID, Se = {}, RefCu = {}> = CtxMSConn<
  P,
  MODULE_DEFAULT,
  St,
  Conn,
  Se,
  RefCu
>;
export type CtxDeConn<P = {}, Conn extends Modules = MODULE_VOID, Se = {}, RefCu = {}> = CtxSConn<
  P,
  MODULE_DEFAULT,
  Conn,
  Se,
  RefCu
>;

export type ItemsType<Arr> = Arr extends ReadonlyArray<infer E> ? E : never;

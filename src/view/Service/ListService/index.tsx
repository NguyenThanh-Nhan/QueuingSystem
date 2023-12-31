import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { IService } from "../../../interfaces";
import Dropdown from "../../../components/Dropdown";
import Search from "../../../components/Search";
import { db } from "../../../firebase";
import DateRangePicker from "../../../components/DateRangePicker";
import Table from "../../../components/Table";
import PathSlice from "../../../redux/slices/PathSlice";
import config from "../../../config/routes";
import "./ListService.css";
import { useSelector } from "react-redux";
import serviceSlice, {
  fetchAllService,
} from "../../../redux/slices/ServiceSlice";
import { serviceSelectors, useAppDispatch } from "../../../redux";
import { AddSquare } from "../../../assect/img/1index";

const statusActive = [
  {
    label: "Tất cả",
    value: "Tất cả",
  },
  {
    label: "Hoạt động",
    value: "Hoạt động",
  },
  {
    label: "Ngưng hoạt động",
    value: "Ngưng hoạt động",
  },
];

function Service() {
  const { loading } = useSelector(serviceSelectors);
  const dispatch = useAppDispatch();
  const [dataSource, setDataSource] = useState<IService[]>([]);
  const [searchService, setSearchService] = useState("");
  const columns = [
    {
      title: "Mã dịch vụ",
      dataIndex: "serviceCode",
      key: "serviceCode",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <div
          className={
            "status " +
            (text.toUpperCase() === "HOẠT ĐỘNG" ? "active" : "stopped")
          }
        >
          <span>{text}</span>
        </div>
      ),
    },
    {
      render: (record: IService) => (
        <Link
          onClick={() => handleClickDetail(record)}
          to={config.routes.detailService}
          className="btn-link_serviceL"
        >
          Chi tiết
        </Link>
      ),
    },
    {
      render: (record: IService) => (
        <Link
          onClick={() => handleClickUpdate(record)}
          to={config.routes.updateService}
          className="btn-link_serviceL"
        >
          Cập nhật
        </Link>
      ),
    },
  ];

  useEffect(() => {
    onSnapshot(collection(db, "services"), (snapshot) => {
      let data: IService[] = [];
      snapshot.docs.map((doc) => {
        return data.push({
          _id: doc.id,
          key: doc.id,
          ...doc.data(),
        } as IService);
      });

      // Filter the data based on the search query
      const filteredData = data.filter((item) =>
        item.serviceName.toLowerCase().includes(searchService.toLowerCase())
      );

      setDataSource(
        filteredData.sort((a, b) => a.serviceCode.localeCompare(b.serviceCode))
      );
    });
    dispatch(fetchAllService());
  }, [dispatch, searchService]);
  const handleClickDetail = (record: IService) => {
    dispatch(serviceSlice.actions.setDetailService(record));
    dispatch(
      PathSlice.actions.appendPath({
        name: "Chi tiết",
        link: "",
      })
    );
  };

  const handleClickUpdate = (record: IService) => {
    dispatch(serviceSlice.actions.setDetailService(record));
    dispatch(
      PathSlice.actions.appendPath({
        name: "Cập nhật",
        link: "",
      })
    );
  };

  return (
    <div className="wrapper_serviceL">
      <h1 className="heading_serviceL">Quản lý dịch vụ</h1>
      <div className="filter_serviceL">
        <div className="dropdown-wrap_serviceL">
          <div className="dropdown_serviceL">
            <span className="title_serviceL">Trạng thái hoạt động</span>
            <Dropdown options={statusActive} />
          </div>
          <div className="dropdown_serviceL">
            <span className="title_serviceL">Chọn thời gian</span>
            <DateRangePicker />
          </div>
        </div>
        <div className="search-wrap_serviceL">
          <span className="title_serviceL">Từ khoá</span>
          <Search
            placeholder="Nhập từ khóa"
            value={searchService}
            onChange={(event) => setSearchService(event.target.value)}
          />
        </div>
      </div>
      <div className="wrap-table_serviceL">
        <Table columns={columns} rows={dataSource} loading={loading} />
        <Link
          onClick={() =>
            dispatch(
              PathSlice.actions.appendPath({
                name: "Thêm dịch vụ",
                link: "",
              })
            )
          }
          to={config.routes.addService}
          className="wrap-btn_serviceL"
        >
          <img src={AddSquare} alt="" /> <span>Thêm dịch vụ</span>
        </Link>
      </div>
    </div>
  );
}

export default Service;

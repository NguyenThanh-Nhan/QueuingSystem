import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { pathSelectors, useAppDispatch } from "../../redux";
import PathSlice from "../../redux/slices/PathSlice";
import { useSelector } from "react-redux";
import "./Path.css";

function Path() {
  const { path } = useSelector(pathSelectors);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [title, setTitle] = useState(path[path.length - 1]?.name);
  useEffect(() => {
    setTitle(path[path.length - 1]?.name);
  }, [path]);
  useEffect(() => {
    document.title = title;
  }, [pathname, title]);
  return (
    <div className="wrapper_path">
      {path.map((item, index) => {
        return (
          <Link
            to={item.link}
            onClick={() =>
              dispatch(PathSlice.actions.setPath(path.slice(0, index + 1)))
            }
            key={index}
            className="btn-path"
          >
            {item?.name}
          </Link>
        );
      })}
    </div>
  );
}

export default Path;

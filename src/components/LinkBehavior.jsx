import { Link } from "react-router-dom";
import { forwardRef } from "react";

const LinkBehavior = forwardRef(function (props, ref) {
  return <Link {...props} ref={ref} to={props.to} role={undefined} />;
});

export default LinkBehavior;

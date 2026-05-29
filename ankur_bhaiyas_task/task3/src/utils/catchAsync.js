// to avoid try catch & res.json("error") statement in every controller
export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

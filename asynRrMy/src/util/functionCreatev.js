function CreateEl(el, name) {
  const res = document.createElement(el);
  res.classList.add(name);
  return res;
}

export { CreateEl };

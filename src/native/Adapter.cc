#include <emscripten/bind.h>
#include <algorithm>
#include "./simplex/src/Tabloid.hh"
#include "./simplex/src/Simplex.hh"

Vector jsFractionArrayToVector(emscripten::val b)
{
  Vector v(b["length"].as<unsigned int>());
  for (unsigned int i = 0; i < v.size(); i++)
  {
    v[i] = b[i].as<Fraction>();
  }
  return v;
}

Matrix jsFractionArrayArrayToMatrix(emscripten::val b)
{
  Matrix m;
  unsigned int size = b["length"].as<unsigned int>();
  for (unsigned int i = 0; i < size; i++)
  {
    m.push_back(jsFractionArrayToVector(b[i]));
  }
  return m;
}

emscripten::val matrixToJs(const Matrix &matrix)
{
  emscripten::val matrixJs = emscripten::val::array();
  for (const auto &line : matrix)
  {
    matrixJs.call<void>("push", emscripten::val::array(line));
  }
  return matrixJs;
}

emscripten::val tabloidToJs(const Tabloid &tabloid)
{
  emscripten::val tabloidJs = emscripten::val::object();
  tabloidJs.set("certificate", emscripten::val::array(tabloid.certificate));
  tabloidJs.set("certificateMatrix", matrixToJs(tabloid.certificateMatrix));
  tabloidJs.set("A", matrixToJs(tabloid.A));
  tabloidJs.set("B", emscripten::val::array(tabloid.B));
  tabloidJs.set("C", emscripten::val::array(tabloid.C));
  tabloidJs.set("v", emscripten::val(tabloid.v));
  emscripten::val baseJs = emscripten::val::object();
  for (const auto &[x, y] : tabloid.base)
  {
    baseJs.set(y, x);
  }
  tabloidJs.set("base", baseJs);
  return tabloidJs;
}

emscripten::val resultToJs(const Result &result, const Tabloid &state)
{
  emscripten::val answear = emscripten::val::object();
  answear.set("solution", emscripten::val::array(result.solution));
  answear.set("certificate", emscripten::val::array(result.certificate));
  answear.set("value", result.value);
  answear.set("state", tabloidToJs(state));
  switch (result.type)
  {
  case ResultType::ILIMITED:
    answear.set("type", "ILIMITED");
    break;
  case ResultType::LIMITED:
    answear.set("type", "LIMITED");
    break;
  case ResultType::INFEASIBLE:
    answear.set("type", "INFEASIBLE");
    break;
  }
  return answear;
}

emscripten::val simplex(emscripten::val a, emscripten::val b, emscripten::val c)
{
  Matrix A = jsFractionArrayArrayToMatrix(a);
  Vector B = jsFractionArrayToVector(b);
  Vector C = jsFractionArrayToVector(c);
  Tabloid tabloid(A, B, C);
  auto itr = std::find_if(B.begin(), B.end(), [](const auto &val) {
    return val.isNegative();
  });
  if (itr != B.end())
  {
    tabloid = tabloid.fixNegativeB();
  }
  Tabloid auxiliar = tabloid.makeAuxiliarSimplex();
  bool run = true;
  while (run)
  {
    auxiliar = auxiliar.makeBaseUsable();
    auxiliar = auxiliar.runSimplexStep(run);
  }
  if (auxiliar.v.isNegative())
  {
    Result result = {
        ResultType::INFEASIBLE,
        auxiliar.certificate,
        0,
        Vector(0)};
    return resultToJs(result, tabloid);
  }
  else
  {
    tabloid = tabloid.continueUsingAuxiliar(auxiliar);
    run = true;
    while (run)
    {
      tabloid = tabloid.makeBaseUsable();
      tabloid = tabloid.runSimplexStep(run);
    }
    return resultToJs(tabloid.getResult(), tabloid);
  }
}

EMSCRIPTEN_BINDINGS(simplex)
{
  emscripten::function("simplex", &simplex);

  emscripten::value_object<Fraction>("Fraction")
      .field("numerator", &Fraction::getNumerator, &Fraction::setNumerator)
      .field("denominator", &Fraction::getDenominator, &Fraction::setDenominator);
}

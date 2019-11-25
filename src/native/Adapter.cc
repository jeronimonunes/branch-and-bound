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

emscripten::val resultToJs(const Result &result)
{
  emscripten::val answear = emscripten::val::object();
  answear.set("solution", emscripten::val::array(result.solution));
  answear.set("certificate", emscripten::val::array(result.certificate));
  answear.set("value", result.value);
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
    return resultToJs(result);
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
    return resultToJs(tabloid.getResult());
  }
}

EMSCRIPTEN_BINDINGS(simplex)
{
  emscripten::function("simplex", &simplex);

  emscripten::value_object<Fraction>("Fraction")
      .field("numerator", &Fraction::getNumerator, &Fraction::setNumerator)
      .field("denominator", &Fraction::getDenominator, &Fraction::setDenominator);
}

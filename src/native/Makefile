export
	CXX = em++
	CXXFLAGS = -O3 -std=c++17 -s MODULARIZE=1 --bind \
	--llvm-lto 1 -s FILESYSTEM=0 -s ENVIRONMENT=worker --closure 1

ifdef OS
	 RM = del /Q
else
	 ifeq ($(shell uname), Linux)
			RM = rm -f
	 endif
endif

all: simplex adapter.o
	$(CXX) $(CXXFLAGS) -o simplex.js adapter.o simplex/bigint/BigUnsigned.o \
	simplex/bigint/BigInteger.o simplex/bigint/BigIntegerAlgorithms.o \
	simplex/bigint/BigUnsignedInABase.o simplex/bigint/BigIntegerUtils.o \
	simplex/src/Vector.o simplex/src/Tabloid.o simplex/src/StringUtil.o simplex/src/Simplex.o \
	simplex/src/Matrix.o simplex/src/Io.o simplex/src/Fraction.o \
	simplex/src/Base.o

adapter.o: Adapter.cc
	$(CXX) $(CXXFLAGS) -c Adapter.cc

simplex:
	$(MAKE) -C simplex/bigint $(MAKECMDGOALS)
	$(MAKE) -C simplex/src $(MAKECMDGOALS)

.PHONY: simplex

clean:
	$(MAKE) -C simplex/bigint $(MAKECMDGOALS)
	$(MAKE) -C simplex/src $(MAKECMDGOALS)
	$(RM) Adapter.o simplex.js simplex.wasm


# CONFIG can be one of:
#
#   reference   denoting the reference interpreter
#   firefox     denoting Firefox and the SpiderMonkey shell
#
# and is used to select implementation-dependent error messages.  Do
# add more.

JSSHELL=~/m-i/js/src/build-debug/dist/bin/js -e 'const CONFIG="reference";'
TARGETDIR=../core

.PHONY: all

all: $(TARGETDIR)/bulk-memory-copy.wast

$(TARGETDIR)/bulk-memory-copy.wast: generate-bulk-memory-copy-tests.js
	$(JSSHELL) $< > $@

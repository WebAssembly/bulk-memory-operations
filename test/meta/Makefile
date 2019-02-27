# SpiderMonkey shell
JSSHELL=~/m-i/js/src/build-debug/dist/bin/js -e 'const WITH_SHARED_MEMORY=false;' -f common.js

TARGETDIR=../core

.PHONY: all

all: $(TARGETDIR)/memory_copy.wast $(TARGETDIR)/memory_init.wast $(TARGETDIR)/memory_fill.wast

$(TARGETDIR)/memory_copy.wast: generate_memory_copy.js common.js Makefile
	$(JSSHELL) $< > $@

$(TARGETDIR)/memory_init.wast: generate_memory_init.js common.js Makefile
	$(JSSHELL) $< > $@

$(TARGETDIR)/memory_fill.wast: generate_memory_fill.js common.js Makefile
	$(JSSHELL) $< > $@

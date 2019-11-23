import * as ace from 'ace-builds';

// tslint:disable: only-arrow-functions

(ace as any).define('ace/mode/progLin_highlight_rules',
    ['require', 'exports', 'module', 'ace/lib/oop', 'ace/mode/text_highlight_rules'],
    function (acequire: any, exports: any, module: any) {
        'use strict';

        const oop = acequire('../lib/oop');
        const TextHighlightRules = acequire('./text_highlight_rules').TextHighlightRules;

        const ProgLinHighlightRules = function (this: any) {
            this.$rules = {
                start: [{
                    token: 'keyword',
                    regex: 'max'
                }, {
                    token: 'keyword',
                    regex: 'min'
                }, {
                    token: 'keyword',
                    regex: 'sujeito a:'
                }, {
                    token: 'keyword',
                    regex: 'st:'
                }, {
                    token: 'constant.numeric',
                    regex: /\d+/
                }, {
                    token: 'keyword.operator',
                    regex: />=|==|<=|=|\+|\-|\*|\//
                }, {
                    token: 'variable',
                    regex: /\w+/
                }]
            };

            this.normalizeRules();
        };

        oop.inherits(ProgLinHighlightRules, TextHighlightRules);

        exports.ProgLinHighlightRules = ProgLinHighlightRules;
    });

(ace as any).define('ace/mode/progLin',
    ['require', 'exports', 'module', 'ace/lib/oop', 'ace/mode/text', 'ace/mode/progLin_highlight_rules'],
    function (acequire: any, exports: any, module: any) {
        'use strict';

        const oop = acequire('../lib/oop');
        const TextMode = acequire('./text').Mode;
        const ProgLinHighlightRules = acequire('./progLin_highlight_rules').ProgLinHighlightRules;

        const Mode = function (this: any) {
            this.HighlightRules = ProgLinHighlightRules;
            this.$behaviour = this.$defaultBehaviour;
        };
        oop.inherits(Mode, TextMode);

        exports.Mode = Mode;

    });

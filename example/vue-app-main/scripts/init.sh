# !/bin/bash

npm install 
# cp to src/config without example postfix

set -x
cp ./config-examples/app-config-example.js ./src/config/app-config.js 
# cp ./config-examples/default-map-settings-example.js ./src/config/default-map-settings.js 
# cp ./config-examples/hooks-example.js ./src/config/hooks.js 
# cp ./config-examples/layer-mapping-setting-example.js ./src/config/layer-mapping-setting.js 
# cp ./config-examples/ors-map-filters-example.js ./src/config/ors-map-filters.js 
# cp ./config-examples/settings-options-example.js ./src/config/settings-options.js 
# cp ./config-examples/theme-example.js ./src/config/theme.js 
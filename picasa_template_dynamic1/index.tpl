#templatefile -v "1.9" -n "SimpleViewer (PHP)" -d "Generates a SimpleViewer gallery with option for dynamic datasource."

define shadowedThumbnails 0
define thumbnailWidth 100
define thumbnailHeight 100
include imagedataTemplate.tpl
include imagedataTemplate-php.tpl
include indexTemplate.tpl
copy assets\
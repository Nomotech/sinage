#!/usr/bin/env ruby
# cording:utf-8

require 'pp'

number = File.open("number").read.split("\n").each_with_index.select{|line, i| i % 2 == 0}.map{|n| n[0][0]}
#pp number

svg = File.open("ver2.svg").read.split("\n").select{|line| 
  line =~ /<text|<rect|<g id=|<path/
}.map{|line| line.strip}

rects = []
texts = []

svg.each_with_index{|line, i|
  if line =~ /\A<rect/ && svg[i+1] =~ /\A<path/ && svg[i+2] =~ /\A<path/ then
    # 9312 1 ~ 9341 30

    #if (9312..9351).include?( 
    #m = svg[i][/<tspan[^>]+><tspan[^>]+><tspan[^>]+>(.+)<\/tspan><\/tspan><\/tspan>/, 1].strip
    #if number.include?(m) then
    bef = svg[(i+1)..(i+2)]

    tmp = line #svg[i-1]
    x = tmp[/(?:x="([^"]+)")/, 1].to_i
    y = tmp[/(?:y="([^"]+)")/, 1].to_i
    width = tmp[/(?:width="([^"]+)")/, 1].to_i
    height = tmp[/(?:height="([^"]+)")/, 1].to_i
    color = bef[1..(bef.size-1)].join("").gsub(/stroke="none"/, "")[/stroke="([^"]+)"/, 1]
    rects << {x:x,y:y,width:width,height:height,color:color}# if (x != 770 && x != 2789)
  elsif line =~ /\A<rect/ && svg[i+1] =~ /\A<path/ then
    bef = [svg[(i+1)]]

    if bef[1..(bef.size-1)].join("") =~ /stroke="none"/ || bef == [] then
      next
    end

    tmp = line #svg[i-1]
    x = tmp[/(?:x="([^"]+)")/, 1].to_i
    y = tmp[/(?:y="([^"]+)")/, 1].to_i
    width = tmp[/(?:width="([^"]+)")/, 1].to_i
    height = tmp[/(?:height="([^"]+)")/, 1].to_i
    color = bef[0..(bef.size-1)].join("")[/stroke="([^"]+)"/, 1]
    rects << {x:x,y:y,width:width,height:height,color:color} if (color != "none")

  elsif line =~ /\A<text/ then
    n = number.index(svg[i][/<tspan[^>]+><tspan[^>]+><tspan[^>]+>(.+)<\/tspan><\/tspan><\/tspan>/, 1].strip)
    next if n.nil?

    tspan2 = line[/<tspan[^>]+>(<tspan[^>]+>)<tspan[^>]+>.+<\/tspan><\/tspan><\/tspan>/, 1]
    x = tspan2[/(?:x="([^"]+)")/, 1].to_i
    y = tspan2[/(?:y="([^"]+)")/, 1].to_i
    texts << {x:x,y:y,n:n}
  end

}
    

rects = rects.sort{|l,r|
  l[1] <=> r[1]
}
texts = texts.sort{|l,r|
  l[:n] <=> r[:n]
}
# puts rects.map{|el| el.values.join(",")}.join("\n")
# puts texts.map{|el| el.values.join(",")}.join("\n")
texts.each{|el|
  rect = rects.select{|r| r[:x] <= el[:x] && el[:x] <= (r[:x]+r[:width]) &&
                          r[:y] <= el[:y] && el[:y] <= (r[:y]+r[:height])&&
                          (r[:color] == "rgb(146,208,80)" || r[:color] == "rgb(255,0,0)")}
  #pp rect
  el[:rect] = rect.first
}
#=begin

csv = "num,x,y,width,height,color\n" << texts.map{|el|
  tmp = el[:rect]
  [el[:n],tmp[:x],tmp[:y],tmp[:width],tmp[:height], tmp[:color].include?("255") ? "red" : "green" ].join(",")
}.join("\n")

File.open("filtered.csv", "w+").write(csv)

scale = 10
width = 26000
height = 19000
svg = <<-"EOF"
<?xml version="1.0" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="#{width/scale}" height="#{height/scale}">
  <title>koudaisai</title>
  #{
    rects.map{|el| 
      g = el
      %Q|<rect x="#{g[:x]/scale}" y="#{g[:y]/scale}" width="#{g[:width]/scale}" height="#{g[:height]/scale}" fill="black" stroke="#{g[:color]}" fill-opacity="0.0" />|
    }.join("\n");
    ""
  }
  #{
    texts.map{|el| 
      <<-"EOF"
<text x="#{el[:x]/scale}" y="#{el[:y]/scale}">#{el[:n]}</text>
<rect x="#{el[:rect][:x]/scale}" y="#{el[:rect][:y]/scale}" width="#{el[:rect][:width]/scale}" height="#{el[:rect][:height]/scale}" fill="black" stroke="#{el[:rect][:color]}" fill-opacity="0.0" />
EOF
    }.join("\n")
  }
</svg>
EOF

File.open("filtered.svg", "w+"){|f| f.write(svg)}
#=end

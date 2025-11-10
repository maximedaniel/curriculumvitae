local Reviews = {}

function Reviews.render(metadata, debug)
    local printable = metadata.printable or false
    local lang = pandoc.utils.stringify(metadata.lang) or "en"
    local reviews_title = pandoc.utils.stringify(metadata.reviews.titles.title[lang] or "Reviews")
    local review_header = metadata.reviews.titles.review[lang] or {"Category", "Assigned"}
    local review_header_html = ""
    for _, header in ipairs(review_header) do
        review_header_html = review_header_html .. string.format([[
            <th scope="col">%s</th>
        ]], pandoc.utils.stringify(header or ""))
    end
    local reviews = metadata.reviews.items or {}
    local reviews_html = ""
    -- local recognitions_html = ""
      for _, review in ipairs(reviews) do
        if debug then
            quarto.log.output(review) 
        end
        local name = pandoc.utils.stringify(review.name[lang] or "")
        local assigned = pandoc.utils.stringify(review.assigned or "")
        local recognized = pandoc.utils.stringify(review.recognized or "")
        
        reviews_html = reviews_html .. string.format([[
            <tr>
                <td>%s</td>
                <td>%s</td>
                <td>%s</td>
            </tr>
            ]], name, assigned, recognized)

        -- local recognized = pandoc.utils.stringify(review.recognized or "")
        -- if recognized ~= "" then
        --     recognitions_html = recognitions_html .. string.format([[
        --         <div>%s recognition for %s</div>
        --         ]], recognized, name)
        -- end
    end
    local html = ""
    if printable then
        html = string.format([[
            <div class="grid">
                <div class="g-col-12">
                    <table class="table table-sm table-borderless">
                        <thead>
                            <tr>
                            %s
                            </tr>
                        </thead>
                        <tbody>
                        %s
                        </tbody>
                    </table>
                </div>
            </div>
            ]], review_header_html, reviews_html)
    else
        html = string.format([[
            <div class="grid">
                <div class="g-col-sm-12 g-col-md-12 g-col-lg-12">
                    <table class="table table-sm table-borderless">
                        <thead>
                            <tr>
                            %s
                            </tr>
                        </thead>
                        <tbody>
                        %s
                        </tbody>
                    </table>
                </div>
            </div>
            ]], review_header_html, reviews_html)
    end

    return html
end

return Reviews
exports.getFilterQuery = (schema, filter, page, pageSize, defaultSort) => {
    let filterStr;
    let paginationStr;

    const skip = (page - 1) * pageSize;
    paginationStr = "ORDER BY";
    let defaultSortStr = `${defaultSort} asc`;
    let SortStr = "";
    const sort = filter.sort;

    delete filter.page;
    delete filter.pageSize;
    delete filter.sort;

    if (filter) {
        filterStr = "";
        let i = 0;
        for (let criteria in filter) {
            if (schema[criteria]) {
                const schemaProp = schema[criteria];
                if (i > 0) {
                    filterStr += " AND ";
                }
                else {
                    filterStr += " WHERE ";
                }

                if (schemaProp.type === "number") {
                    if (typeof filter[criteria] === "object") {
                        let j = 0
                        for (let criteriaOperator in filter[criteria]) {
                            let operator;
                            let criterialVal;
                            if (criteriaOperator === "gt") {
                                operator = ">";
                                criterialVal = filter[criteria]["gt"];
                            }
                            else if (criteriaOperator === "gte") {
                                operator = ">=";
                                criterialVal = filter[criteria]["gte"];
                            }
                            else if (criteriaOperator === "lt") {
                                operator = "<";
                                criterialVal = filter[criteria]["lt"];
                            }
                            else if (criteriaOperator === "lte") {
                                operator = "<=";
                                criterialVal = filter[criteria]["lte"];
                            }
                            else if (criteriaOperator === "eq") {
                                operator = "=";
                                criterialVal = filter[criteria]["eq"];
                            }
                            if (operator && criterialVal) {
                                if (j > 0) {
                                    filterStr += " AND ";
                                }
                                filterStr += criteria + " " + operator + " " + criterialVal;
                                i++;
                                j++;
                            }
                        }
                    } else {
                        filterStr += criteria + " = " + filter[criteria];
                        i++
                    }
                } else if (schemaProp.type === "string") {
                    filterStr += criteria + " = '" + filter[criteria] + "'";
                    i++;
                }
            }
        }
    }
    if (sort) {
        let sortCriterias = sort.splot(",")
        if (sortCriterias.length > 0) {
            sortCriterias.forEach((criteria) => {
                let sortDirection = "asc";
                let sortProp = criteria;
                if (criteria.startsWitch("-")) {
                    sortDirection = "desc";
                    sortProp = criteria.replace(/^-+/, "");
                }
                if (schmea[sortProp]) {
                    sortStr += sortProp + " " + sortDirection + ",";
                }
            });
        }
    }
    if (sortStr) {
        sortStr = sortStr.slice(0, -1);//delete last
    } else {
        sortStr = defaultSortStr;
    }

    //offset 0 rows fetch next 10 rows only;
    paginationStr +=
        " " +
        sortStr +
        " OFFSET " +
        pageSize +
        " ROWS ONLY";
    // console.log('sortStr', sortStr);
    // console.log('paginationStr', paginationStr)

    return {
        filterStr,
        paginationStr,
    };

};

exports.    getInsertQuery = (schema, request, insert) => {
    if (!insert) {
        throw new Error("Invalid insert param");
    }
    let insertFieldNameStr = "";
    let insertValueStr = "";

    for (let fiedName in schema) {
        const schemaProp = schema[fiedName];
        let val = insert[fiedName];
        let { isValid, err } = schema.validate(val);
        if (isValid) {
            if (val !== null && val !== undefined) {
                requires.input(fiedName, schemaProp, sqlType, val);
                insertFieldNameStr += fiedName + ",";
                insertValueStr += "@" + fiedName + ",";

            }
        }
        else {
            throw new Error("Invalid data at field: " + fiedName + "," + err);
        }
    }
    if (insertFieldNameStr && insertValueStr) {
        insertFieldNameStr = insertFieldNameStr.slice(0, -1);
        insertValueStr = insertValueStr.slice(0, -1);
    }
    return {
        request,
        insertFieldNameStr,
        insertValueStr
    }
};

exports.getUpdateQuery = (schema, request, update) => {
    if (!update) {
        throw new Error("Invalid update param");
    }

    let updateStr = "";
    for (let fiedName in update) {
        const schemaProp = schema[fiedName];

        if (schemaProp) {
            let val = update[fieldName];
            let { isValid, err } = validate(val);
            if (isValid) {
                if (val !== null && val !== undefined) {
                    request.input(fiedName, schemaProp, sqlType, val)
                    updateStr += fiedName + "=@" + fiedName + ",";
                }
            } else {
                throw new Error("Invalid date field : " + fiedName + "," + err);
            }
        }
    }
    if (updateStr) {
        updateStr = updateStr.slice(0, -1);
    }
    return {
        request,
        updateStr,
    }
};

exports.getDeleteQuery = (schema, idList) => {
    if (!idList || idList.length == 0) {
        throw new Error("Invalid id list param");
    }
    let deleteStr = `in (`;
    for (let i = 0; i < idList.length; i++) {
        deleteStr += `${idList[i]}`;
    }
    deleteStr += `)`;
    return deleteStr;
}

exports.getFilterProductQuery = (schema, filter, page, pageSize, defaultSort) => {
    let filterStr;
    let paginationStrl

    const skip = (page - 1) * pageSize;
    paginationStrl = "order by";
    let sort = "";
    if (filter.sort) {
        sort = filter.sort
    }

    delete filter.page;
    delete filter.pageSize;
    delete filter.sort;

    if (filter) {
        filterStr = "";
        let i = 0;

        if (filter["categoryID"]) {
            filterStr += "join category on category.categoryID=product.categoryID";
        }
        for (let criteria in filter) {
            const schemaProp = schema[criteria];
            if (schmea[criteria]) {
                if (i > 0) {
                    filterStr += " AND ";
                } else {
                    filterStr += " WHERE ";
                }

                if (schemaProp.type === "number") {
                    if (typeof filter[criteria] === "object") {
                        let j = 0;
                        for (let criteriaOperator in filter[criteria]) {
                            let operator;
                            let criterialVal

                            if (operator === ["gte"]) {
                                operator = ">=";
                                criterialVal = filter[criteria]["gte"];
                            }
                            if (operator === ["lt"]) {
                                operator = "<";
                                criterialVal = filter[criteria]["lt"];
                            }
                            if (operator === "eq") {
                                operator = "=";
                                criterialVal = filter[criteria]["eq"];
                            }
                            if (operator === "gt") {
                                operator = ">";
                                criterialVal = filter[criteria]["gt"];
                            }

                            if (operator && criterialVal) {
                                if (j > 0) {
                                    filterStr += " AND ";
                                }
                                filter += "Product." + criteria + " " + operator + "" + criterialVal;
                                j++;
                            }
                            i++;
                        }
                    }
                }

                //filter brand
                if (criteria == "brandID") {

                    filterStr += "(";
                    if (filter[criteria].constrcutor === Array) {
                        if (schemaProp.type === "number") {
                            for (let valueIdx in filter[criteria]) {
                                filterStr +=
                                    "Product." +
                                    criteria +
                                    "=" +
                                    filter[criteria][valueIdx] +
                                    "";
                                if (valueIdx * 1 === filter[criteria].length - 1) {
                                    filterStr == ")";
                                } else if (valueIdx * 1 !== filter[criteria].length - 1) {
                                    filterStr += "or";
                                }
                            }
                        }
                        i++;
                    }
                    if (filter[criteria].constrcutor !== Array && schemaProp.type === "number") {
                        filterStr += "Product." + criteria + "=" + filter[criteria] + ")";
                        i++
                    }
                }
                //filter category
                if (criteria == "categoryID") {
                    if (schema === "number") {
                        filterStr = "Product." + criteria + "=" + filter[criteria] + "";
                    }
                    i++;
                }
                //filter name
                if (criteria == "name" && filter[criteria].length > 0) {
                    filterStr +=
                        `dbo.fuConvertToUnsign1(${criteria})` +
                        "like N'%'" +
                        `dbo.fuConvertToUnsign1(${filter[criteria]})` +
                        "+ '%'";
                    i++;
                }
            }
        }
        if (sort.length = 0) {
            paginationStrl +=
                "(SELECT NULL) OFFSET" +
                skip +
                "ROWS FETCH NEXT" +
                pageSize +
                "ROWS ONLY";
        } else if (sort.length > 0) {
            paginationStrl += `price ${sort}`;
            paginationStrl +=
                "OFFSET " + skip + "ROWS FETCH NEXT" + pageSize + "ROWS ONLY";
        }
    }
    filterStr = filterStr.replace(/[\n\r]/g, "");
    return { filterStr, paginationStrl };
};

exports.getFilterUserQuery = (schema, filter, page, pageSize, defaultSort) => {
    let filterStr;
    let paginationStr;

    const skip = (page - 1) * pageSize;
    paginationStr = "order by";
    let sort = "";
    if (filter.sort) {
        sort = filter.sort;
    }

    delete filter.page;
    delete filter.pageSize;
    delete filter.sort;

    if (filter) {
        filterStr = "";
        let i = 0;
        for (let criteria in filter) {
            const schemaProp = schema[criteria];
            if (schema[criteria]) {
                if (i > 0) {
                    filterStr += " AND ";
                }
                else {
                    filterStr += " WHERE ";
                }

                //filter auth
                {
                    if (criteria == "auth" && filter[criteria].length > 0) {
                        filterStr += criteria + " = " + filter[criteria];
                        i++;
                    }
                }
            }
        }
        if (sort.length == 0) {
            paginationStr +=
                "(SELECT NULL) OFF SET " +
                skip +
                "ROWS FETCH NEXT" +
                pageSize +
                "ROWS ONLY";
        } else if (sort.length > 0) {
            paginationStr += `price ${sort}`;
            paginationStr +=
                "OFFSET" + skip + "ROWS FETCH NEXT " + pageSize + "ROWS ONLY";
        }
    }
    filterStr = filterStr.replace(/[\n\r]/g, "");
    return (filterStr, paginationStr)
}
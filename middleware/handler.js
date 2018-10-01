const handler = fn => async (request, response, next) => await fn(request, response, next)
    .then(res => 
        response.status(res.status || 200).json({
            ...res,
            status: undefined
        })
    )
    .catch(next)

module.exports = handler;
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
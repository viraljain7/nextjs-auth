## NextJs Auth

### Study

- mongoose connection event
- exit code
- jwt / cookies

```js
npm i mongoose nodemailer
```

#### `src/models/userModel.js`

```js
//special case in NextJs
const User = mongoose.models.users || mongoose.model("users", userSchema);
```

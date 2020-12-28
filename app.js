const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('landing'); 
});

app.get('/campgrounds', (req, res) => {
  const campgrounds = [
    {
      name: 'Salmon Creek',
      image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQTEhUTExMVFhUXFxgYFxgYGBoeGRgaHRcYGBsdGx8dHSggGholHhcXIzEhJSkrLi4wFyAzODMsNygtLisBCgoKDg0OGxAQGi8lICUvLS0tLS0tLS0tLS0tLS0tLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAADBAIFAAEGB//EAEEQAAECBAQDBAkDAwMDBAMAAAECEQADITEEEkFRBWFxIoGRoQYTMkJSscHR8BSS4RVT8SNickOCogczY9IWJcL/xAAaAQADAQEBAQAAAAAAAAAAAAABAgMABAUG/8QALREAAgICAQQBAgQHAQAAAAAAAAECEQMSIRMxQVEEYfAicaGxMkJSYoHR8RT/2gAMAwEAAhEDEQA/APShLjTEaPFArjijZQ8P5iKuMKN28ICjIx0QnJ1UB1MSE0GxfpHKqxD6p8B9YglBJpXoBDas1HXZ+sZ64bxzmGRMunNDYxWIA1Pd/EK19RtWXAnjZXhE0YpOoWP+0tFMriE/UEdx+0BVipiixWR1p9RGo1HVScpsXgolPHMScOm6l9+b+Ydw85KfZWrpnH3IhW6DqXfqY0pAF2hWVxBx7JPeImnGp1p3wNzaE/WI+JPiIitQGo8YTxS5RDn/APn+IrJ3E5aaCWojr9IdNsWg2N4xk93xeK4ek5f2A3fC+I4ilRqFDuEATOSC6UqJ/wCIi8YquUAu5fFgsVDfuH0hr9ChQe761MU2GxZJAylPPKn7R0ctScoJUT0F/B4jN6vgZIBJwstOgJ6fzBcg+GkGlkGwI7oyZhQf8wm4aQElIu0BViUQPHpEsO2Y6Afloo5vEpvuoA7vvFYJyFdF8Z4NniIUY5s4uf8AE37YGcVNdzMPjFemxbOrAeEeIcTlyvaqdks/ftFHO4iSO1NUen8QhMmSzcEnr/MNHFb5Fst1+k6PdlKPUgQhP9JFknKhKdnckfSK6bPQLIHe5gSsZskDo0dEccfQrbJYidMV7RUe+IoUpQZ1fSBzMYuAnFL3iqQAhSq2Xyga0K2jX6le8L4rjHq/aVXYVP8AEGwUw6kHaNIJ0+RivT6TA3zDu+xjFekCT7x8D9o2yBRbiVzPhGRUf1xHx+SvtGRrQD039EgXlnrT7RMYKWfdP54QhJx8xNiYZRxWZrlPUR4co5PtnopRCjDyh7hPefvDuHmYcD2AD/z+8V/9QUfcS/f940nGK2HnCuMmuf3DSLlCpCvZcHkftBZfDpZolR6PFRLxu6Pzviww2MlG7p6j7RCalHtZRRVBf0Eu2cA8zE08Pk6h/MfOJFcoiikecFkYFCrKB6GJdSX1A68gP6egXA8IkrBoTXL5fxDU3ho0Ue8/xC8zCEe+D3wd35YU4vyBms1G6CFFrOiXPMQ9bVP7hEFzE8vERWEwuCZWLxExvYR5QoszF2RXkBFupSBdQ8RGhikfEnxEXWWuyJvGvLKX9DON0eIiC5ExGkXUzGy9/wDyELKXLV7zH/kIos0vKFcI+BSVxCamgYc8oMEPFZrVUPIfSCplyv7gPfBCZA+HxeNvH+kGn1K2bxCcbL84AvE4g++T3xcGdI+FJ74inFShZAH51hlk/tFcF7Kb9LiToo98Cm4TEC6T84v5fEEjcPqP5gqcVKN1K8TDdaa/lN04+zkl4ed8C/AwL9FO0lr8DHa+vk/EfExIz5XxDxjf+uS/lB0l7OHHCp5/6avCNngs/wCA+I+8dDxjjmHkOKrWxISLcsx0jzhXEJvrFTUrKVqLkpp5bdY6cOTJkV1X5iSjGJb44CSrLNUEqZ2N27ukc3j8aZhpRIsH13MTxsxcxZWtRUo3PcwhcpjqjdckXXgnKx8xNlONjX+YbRxn4kP0LeTH5xWqpeATFvaDYBzGcXWqiOwOV/H7RVqrBGjShCOwgiI0RBQiMUmAAC3KNxPLGRjHtX6c/D842JB+ExZRsR5Z0qbK8ST8JiaZZ+Ew6RG0xqGU2LJln4TBEoPwHwhtMFRE5JeikckvYogboPhDEiYkXQrwg5MYDEZY0/H6lOo3w2GVipbUSsnoYUmTQf8Apr84bzDl5RhPSEWKN9gJ15K1Usf2z5wFWHH9s+cXQiBEXikv+geRlIcJ/wDGfOIfpx8B84uVCOY4/wCl2HwswSpmdS7qCADkBtmci+weKpEnN+RtUlPwHzgfqk/D5Qvg/SXCTyAicnMbJV2T/wCTP3RYmVDpA3AGUn+384w4cf2z5w5KlQ3lpGBsyn9SP7fkYz1Q/t+Ri2Aim49x1EgFKWVMaz0TzV9oDkl3Cm26Rk5SEJzLCUJ3VQeZijxXpVhkkhIMwj4UsPFRHlHJY7GrnrM2YonZ7AchoIrZsx7W+cc8s7fY6I4P6jpZ/puXZEhAG5JPyaAp9NV6oA5pA+pjl1fn5rGwmE6k/Y7xx7UXi+LSlklRLmpzPXwpA5k5JqljFKoV6f5+0bFLUh18jIubFeGBd4fCrmv6tJU1wA5HdGT+FT/7Mz9p+0V2ExikKCkkgjUU6x0uG41mTmUFKYFsrAkh6EEgA849DB8tSVSOTL8dx5RQq4RP/szP2K+0QPCZusqb+xX2gY9LMWqfTDqyAsZYSpSwNSSKgtWzR10jHSpic4nJSGftkIIrqFEER1RyJnO1RySuGTdJUz9ivtGK4bN/tTP2K+0XPHOOJkBIQoTVksQhThNHc5XfuiiR6Rz+1MOajsjKQDTxd4LyRQKNjh83+2v9ivtEVYKZrLX+0/aHp/HpuXRJYVc+TmKzh3FZ0uaSpRINwpRY9K3EK8is1M3+kX/bX+0/aMjokcekkP6xf7VfQxuG/D7ByejDiEu4Kj3K+0LTvSXCJXkVOSlfwksfCPHpXE8TOVlm4uclBJzEOackUzHq3URUI4AoqJUsAOaqLqOxo7GOLpN+Cux7yn0lwhIHr5YezqAfo5g44xIbMJssp3C0keRjwVfCZSWUqcSH9kIv4qqPCNyzmmLmhRFQRmYhPacAa0IoxjdMOx70PSDD0HrUV/3D7xDFelmFlAesmZHZnBq+zCseGT5kypE6YCQaoBckVYm7WjalGbKCVAkigVMCipuhUaVowEZ4kHdnuSfS/Dk5UqUToG+7V5Qc+kCBeXNA39Wv55W848c4fx7HSUlMqYoi7zCpSklg7FRqNg1OtYsB6W49ctSDNyEuMwSAquxy07g/fZXjig9RnrMjjyVh0IWqrUSftB1cSVrLUkDVTAR4j/WeJBbjGLZiKlJAeliGfnB8XxnEqnieqeUryhJyEpTQN7IJSdXhdI/bNuz1rHekYly8+UsFAHsrVq3u17w8E/qy8mdkZWfMVAAPZybCPM+G+kGJOcGcVZmqa9WcMH/NYVxOKmKR6ozVlIJoa1qbs7VNHiXUxqerZbpycNi8476fz82WRkSkUzAZsx1Ieye6OC4ri1zZsycSDMWolVGB6RYKwYI9tr6chztFdisGUsdDY/nztHWtauJzO+zFpc0KZwx1i0wXH58lhJnrSNgXT4KceUVSJDF1KYkPQb7uLc4GlCypizfFYNAb9gs6r/8AN8WojMoUvloT9O9otl/+oq2GWUMwNQVFiG0O7tpvHG4iUlGXKoqOtG8DAFOVBLdpRAHf/MZ0jLk9O4R6R4rFMESxLzUBueZGwFamKf0lmS0q9RLLhLmav4lGpD/msM4jFfppQCCQcoQALkMP4jm0p1NzWPOyZduEelixa8kJ0x+SRYbwLI/L6wwUfn5aNNEywHJGBEGCIjNSyTuaDvv5PGsFChs+8ClJY9b/AHh4IpGeqEdEJwUGmRlCTkmgGWCS5hRVOlxvGKV+fl4XxCix/NREIyqRfwXHq0Tk5tRrqOR3EVc7DZVMX5bcmI6QthsUpJfx5iLTEtMSlaa1rvu3Jo7seXV0+xx/JwpK0V5Nak9Py0CkypRLKoCdCXfnW1NosUyQFAlHTMafeDHCIUGaru6Sfm9Ys88TiFF8KllsqnFw7qqNmIia+FJAvXUkPbZzSDowZCSETCAHNQfpSIypSyWM0B9QD9Ym8/PFGoR/pCTXMP2fzGRbHhszSd5GMjdaXpGop1zpbg583efqY0cWkl2Ku6MGGb3vACNjDg+8tXe3yiTzt92Hg16x/wDpnqUxIH/Yka6fSJpww28SqJplJGqB3D+YV5X7MDVNLuMg8T9KRiVKNvEA/UwwG+Lwp9I2Vj4vnCdQwsqQs1JXysPmY2nCKd/mo/QNDH/cfzujYQNc3efpGcmYEMM3I8niZT/yPh9Q8Tp8REYjLd3jWzD3DUK+Fq/QQ7jMGoqJGoBifCMKFEFIvWOolYByKe63gY+f+TnrK2fRfHxR6STPOeJYQ2BZtYSlJUB2jm6gx0fH5ChMIDgOQKaPFMqWo0PhHsfEyt40eP8AMjWV0KqO1vzeNTQSNO//ABD6ZQ3IjcyQNy/X7R19Q5CjVg1G6n7ouvRfCD1mdZ7MtOY01NB9YD+mJe56GDyMUiWnIskOcyqEubAUeg+Z8UnN1wWwJOa2G8VPM1edVB7o2ERy7Dx/PpAv6zhx74/8vtEk8Xw5/wConxH1MQUWj0d4vySEvcxLJG5eNkqstH7k/eDjKbF4wbFssBWHU3w/M/giw9UAHPyvyhJbp0qanrA8hIqAH5+NCsyY/Ty8LmJrO/50sIEpadVJ71CN3BaNNA8QeyYkqege+j9w+8AxGJRlotJqLF/lGSdoKaACGcHPy/8AE3H1hBeMSLBR8h5wI8S2SkdT/EdVAlTVM6hc3U15/wAxBeIcMkU5XinwfFHYEUZiWND/APWLCXOKg+8JTXc8mSp0My55Fx/FIiU5r93n9zEEKpY7axtU4izfnKNYppWAQouoqc37QjIKJyuflGRtmAVRM5V5QWWCs0B+XiTYRgVTTuaK7jOOWkBAolQdTa7Dp9YONKUqYw+gZiQljuYn6rcpis4ZPCg2tuov3xaKUWLZUlvdAHSwrFMuKMVsuwEzRQNx+fOMSAXqlxrfwiu/UYkEZVZi5fMEkXb3g0WsgzSGnLlCvuS0kkc+yG6xo4JSVxNaNBtAPOJEdB3RKfPlJfMoUtS/RnDc4VlY85qJSxsNdedaCJdLLz+EwylNezl84mohIqQHOtngR4oEGqBMLUDsl/8AdqW2G94UXi52IPvE2AAZKRpyA/KxTHgnJXLgK7ndeiklymO8l4dI00pHG+huDKAAVOeVv5jvsFIKnHSPlvktrNJL2e/KWuNfkcLx6S5WTYB25xw81yqiadQI9M9MOFuhYS+bQjYVaPPcJwucsqUpK0ozasPIVj1PhOU+Zs5/lY+pFaCq5VfZr3Rnq+Xd/MOzMEk5lJWpnuqUttdbNFUjEu4BN2s4oa0Mehkwzj3PIffgKpKuleX0iKsOTdvP7Rr11K9nYBnMB/VAhxlNt3iaTAQmYFOoT4QJfDUFuzTpSGhi20tyvBEz82kHk1lXN4Qgi3hC6uBC4PlF+C1wB+bxNCXt/mDu0HZlDI4WtBLlRoQm5YmjkPoH8oW/oUw3PiY6dSB0/NoEuSNg+kHqOjbM54ej51aIngIjoAkA1B8YlS9YbqA2OfPAgKsa8zG0cOy2atDXnF2K0Z40Ryb81g9RmUn7Kn+mJeqQfGDfowLJvaLFUs7d8aHg0DdgcrEhh6bRuRJIN/CGwTziIGrEfl4XY1kmv05D/EBnF6OeVbwwo/lYilL/AOI2xrIAEU+sZDQcat3xqG2RrFSrUhvnCPEMKuYpISA/NQoP8wdU4PlFzZ7Qx6tmYuf9n1JFvvF/iY022zNjnCOE4aXWYqYtYS6m9gWBD+0b3pDuOm4dJSqXIMxjoohw7G55j7xXDDTASQCCTvVvletTAZeeWSpbmlHYqO7m+1eUdE24L+HyFcltxHGyQnMxALFnLgnTrQxX47EhUvNLOYgEjnuCI16L4wLmzFzEZgEgoSRQaVFXPXeL/G4lUyTMQJIBKCEAJSGVcMWcE0Du1Y6YyuHAGlZwMmWuYSogrUeVG2AFGhj+mTTRCWI5sH/N4sZPBMSylSyiWaOPWIGcc2UQ/Ohhn1UxK0iYsDMWICg7t8SSxFNS8Sil2YzsSwGEnTgsDdqCiSLsWY+LxfYX0fmlAC8x3JKUvXYW27hBUTVJDIUABRhTwOkNYdcxS0j1igSW9ql9/LvhpawTY0Iyk0dn6O8PISlwxZjV+/yjq+Dpoa7RDg+D9XJGapbrpvHnno/6TT/6sEE/6Ex8oFUhCkgyyKUUWSTe5j4l4t8jl47nrzbyxaXg7/jeDSRXW/dHF8WVkSUpZ2oDUPHovFB/pmPLvSKcxO5P58o6viyccqguwuJ7YnZUY3iBIYpzeAPiLCKwLlqf1iMq6ilH+7Q5Ol0qz3haZKCklJFDc6x9QtZKmeXPG/BWKkOCWsKsx159Y3h8KkGqV6VUR4cockJ9SEp/9wEs5FhbT7axqbMRbKXJ0Ni+nnpHFk1hLUWiCZAAACTWg7QPIPq/WCjCUchW5o1IiqWtJJljsmtPadrQin1uZ85q7ggU11pAcFVoFD6pYNBbzH3iJkauaa9+0RmY0AttGKnOwCRvW7xBc+AEkynd/Ej82iZFaeUZJQ4dW9K37mtGEZQGIr431jNGIFHjtr/EYU3dw3KDKdQ9pjXR38LQPK1w4vb790FoBH1QNn73EaWhrgWuLdYYz6AsOf5T+IEzmFc0jAVIjAg/CB4Q2mWKHN0+9YHMlh/qesDYAI7tTpEE3raCKlNZRggSafndDBFwNg/58oxCAb0/4/UQVYoxJ8AW8KxpMlTaNzHSMjUD9WfifujIOpO+U/8Aa8ag8GK1OBBZS2SKqYFy3V2D2eDyUkB0pygndzZri1tIEMIEs3aYNWHAksD7rWHIG+ouLR7kccca4FXItMQCWc9x/NoR45PyIURcM9rOIaM0lKVJFCTm6M1NbxXcb7UsjUh+78aOXLPbjwdEY0hjgvFimVVRGbNQFnJNugAiwkY2WosFOe8+cUnBQDLINktt9YNLw4SpKgS2tb00raHjJpfQSi5mzwKu196+Uc/PSrETkSpZqVA5nokbltB9Y6HheFTMrMWUA/CkGlnYlm6Ra8P9HpUsrVKxLlbPnl2azVduVoV3dsouewXiMj1YDKtQvruRt0gAqzkhtdPtDmK4XOXKKPWS1uCHdiX+UcZLweMlq9WoqpTKS46ClR3xGWVu0+TojBKqPekY7/8AWpmJGYGXWrUsai1AY530AlYfEThMlSVS0SEZAFnMXOY32GcgbNFxwZIVwdSVFmkzEqb3SxpyuD3xXf8ApRJKV4wPTOkjvzfYR810u9/dWdV6wnXv9zs8TiMyVpFwCe4R5DxHF5p6x8JKe8GPT1zVCdMlhs5Tnlvq1weRr4R51/6jYAf6eJkIyzDm9YlnZQ1bXXxG8L8CdZU5emhY/hg0l3plXjpgAcv+bbwpNnJAckAfnnFPN4zMUXUkEgEX/L/SFcRxWaWSjKlTgEZSSO8sBSPpMeS0cc3yPzseCDoLBJ9pXM7DlA0uRsxd9WGnlvFYlK85UoU6Nu3UxZ4UpUe0k3q3KJSlcyMlyTw06YGZRpToOexreHZWLyukv7N+TgUfmdIlguFrmk+qR/pigUsZRzc612hbiGDRJV6uWpayzqUSSgM1BsxapJMNT2aBqzapIJLyw4uSA48NbaQFArQ9zBu9q/4hqQFJUAEkpa4JY/x0hntTDl9ptVGw5UezRN22ABLklnJJ72DP9PpG0AjRLHmeveYxlB/eKSXZqfjCheDIkvVbVILWPT52ha9gBy0JNgoeLHpfZrQyuaQKX2FW73eBpWHYM2wOnU0f7RoSqqZgSxNKveg3tGapcAYtMUR7VeYjYmD4W2c8tIIBRnJ3NC1YxWCKiS+56B/nEnG+QAVDNYgXPONS5Cwxf8prvBJ0jKHDZvp87wGQubctle29B/MZRYBhHMUa+8FRMGpgAmFi4JJr01t+GsRUCpgTlh3wjDCkNUEiNmuv3gRBUCysxFADrrAUyl6IAIH7unn5QyXFoIz6o/EfCMhRRY7eEajav0YT4ljQlk1KvLvMVwnqKiC+gDO2n3EK4pTq6PfUZbjlVxBZC7XNwWGrCtWaO+WRyKJJFnhZjEavpc69/wCPCs+UpZS4vc6ChS51aoPdDeHktVTVuddQ27M0PzJiZMpS0ElXtMa27tgaQqalwNdoW4Fwgp7aw2ol8632Bu0PcWw3YYADMpAcAAgqUA9OsWQmJd3FqeRhKfxByEoYqL3IoKFwN6BiY6J6Qg0LRvhX+oeyWDUYaU8otJicuo5HwjlpJCFISCWCnZNyzmjVoHZjD+O4sCQhCXSUgguSa/WOTPnU1wdPx6jyzpMNPdL6WhP14E6Yo3CUga6C1L084rZXFpYSEZmUHYEKagsVMyT1PhCuAlf6szEq9WpSUZUhCswSVApFd2fxjj3cVZ3OnJJHqPo2gDhClEl50wqW+6piQQOQAbuMR9B5Kgla0+9iUg8gmX5uVmLXGYYS+HSkAMAUBha5r0o8ClShh8CgB8y5ilDcuok9+UR5mdyeG/v75JxdtpeXQxxsmTi0YhXsZQknZi/1Mcp6Yys+LVKCgJiQCASwmJNUt/8AIkkDmCDoY7v0lkJxGFABotik9xV8gR3x5Z6a8PmZkYjM6cqUkvVKkhgSdHABpqNIMMGk9k/Np/mrDhkppJ96r9SkxuCSpRo0wX0JrqO68DwuESCaEk7s3l+XpFkZgxSBMfLOQwmkAPyW2ytRuIT4lgxKWFomqmLo6QEgDm2/I3ePVhJVtRzzxtSpAFkqbspSxU1ASQkF2DjlUCBqlpllKioAA9oZQ5Au51I1FTpGpynfRVG7q33t4CJHhEyYjMlDJAJDzAMzuXSCbOb8oeFz5Itlj/UkLGb1ySALFdaf7bjo2sVZw4mH1hzAJchO7PcEGl4zDYfIOykmj5leHZ1pXxhlSkgBSQ5NwasdaNzh9tRZSbCTMTROQZiz2Dt136QJSVOFFJA0NnrRz3W6QeXNzMlRA2Aal+T6wqqe7sMxZqUDU36Dw0ibTfLJtE5M0Aa1NTWvhU90E9eLg0SWt5GjjpEZWHKtHzAgOL/fv5aRZcF4OZhzzE5paCQE2K2JIAAD5Sq+mkCML4QKA4HAqmB0umU1ZjFiWB7INz0NIsTw2WUshSs6RUk1VuwYN+XizxkxfZSUCm1h/wAQzDkISmEO1EnTnrT80j0sfx4Jc8sm2c/MklC8pvuLkb95g2IWGDNzD1i84tJ9ZJNgpFUk3LXHJx9I5ZeKc2d2FDSz0f8Ai8cuXB03S7eAphwcrGpatTeumwDRtWKSSaV2A12b+NYiJx+AEJFkg06xtKUnRlUZ9m33d45mYwKcVHaG5F+jQGZIR8YUrlYdfpB3IuRuPB+/aIGeAVEkWA6tXvLkQvMlQaNDDs7OA23zjSkTEkDNezi3jzjcvEEB6hj8tef8mNycRqFEnYXFP5hIpJ0zBTMWKMk/8kh41GK4gRQEtySr7RkdGy9GKaVhZYFQlwWHKhcG9HI6OYnIwBbOyctWBLh6B7Nz1sIXwkmaFrWtKQA+QOwzUYODR6c70EO/q3TkKgWAahpqXzV/LmLOhxbFIWVDMpNRrRxbRxreMmTFFhe1GAGu5fUxKUUqVlDdGHK5Ae/PvhgJCS5S+WlAWu778q/SFTQasEMMQBdyOyAxDkAivSpaBY7Edhm5ZtBV6gCvWDJnrIKk+rNQCFPTVNBrQwt6qZcqYLuwBHM1Tbpv3wslEOoSUnIMy8wfKQQkNlNHDkHKftBpKhVmKctSGzJsbEF2sSGvpCRnkFJCHUmnaHZCTrd3ZqWDbwaRhSlQ/wBRKQaUAZm0ZQ8FP32iEoFccZWSmzQoZAALkezUbU1JY690XPodIzzky1J/0kH1q6e0Q2Uc3OWnIxWYZKArsOb1YGg27VBf7iLThOHnZ8yACCpKswIzKS/s+9letWL6UrEJRbVI7cSp2z0fjfElLkSwXSkhwkghRYs55XIHOC8YnJTIkpHaUhFSDQBQAf8Acwilxs6ZOQgzEhC0uAHBoosx0dgLb90VvHeMKJSEKGTsFbC4f2DUVF9nPKOfLGoQT++RsULm68HRSuPGRh5L2Vi0y6gmiku1+z2ia7CEuIZs5lqCVS1ZkmWRUjdO6g47NyLVDHmuN4xc7CpEt29a4AIHay+0dmY+MC9JvSZC5MntNiwULKUvlFMq8ymyhNfECOnBBXJeP9C5FrUq5t3/AJKjFzV4XEdlSVBLMxcqSdCKVa40Z9oc4ni5S5ktaAp1DtJGhtUWe78gIsuH8QTikKUJShiMrLCCGUFEDMVEgA0u4JYitCJTsEuWAVpUwqMpcPuSDfT8EXhFw4StE5fiVt8gFoSFdgkh/euGOug5EwDGz3IQe2ARc8wXY+XOGzOQoksBTzZvOnnFdicUxBAtoAb0F4pLI1wjmkTBJfS1WD7AchXzMZ+kCCFMSD77jK1aDc121jRmLU4DAKIqGoOtNdvpGlMFBGValFVWchrDMRsOTaPB5aEYSbgUKqXBo4Kqn+LCGSiWhnYqYEgVCRo56QmucmYo5UnskPU00HUODEAUOQAAkMFEkKINbUpZmpaBXsWw4KVF1EpToXHXsjemzR1OF4ggJSlAJQkAXBIanfpHDzcYlSykbpD30uzU0ptWAYozpf8A7anq2V23FDTTWLYpKHgVnfcRxyGBdzrUADrv3CK39clx2pZDWDkk0ryb6aRx4x8xIpIrqFKOW9AGB+esAncbxAdpUvpUgN/3VHWOtZ4rglrZ1nHp0v8ASzcjJV2SFjQg0Dcyw745TBYoAJJrowNKWNmIL+QhbiM+dPZU2YCkN2UhkpPIDWJ4NHZBJfubv5UEQz5FJjJUXCcQVPQgHcCugNBbq1oiJ9k30ALnRu6wbugWBmAAi4OoY1bV3P8AMERhiEsHYuXAuXAAJd8oDDSORqLCbSwUaKbbUPs52KYYA9/IKOz3tA8ssscjVuS5I3q2xrE0z+yHHjQc6ikJVGAzyTUVJej7dIHLCiB2a6ttuXhxABF6jS1z+eECWRmHaPUX2PdCrW+wDJaVt7h5uYyDLlpctmPNr84yGv6Go52ZjfXZQt0EAFwSQz6lg9jVoZSssBnIBKq1Djertbzhaal1gpWfeoCkAApULBw+5BAraNKnpdAoSNyQkatQsdI633KDkvDsCySA90kEXbR2Lm2j8oDPKkEZlUN61r5A/fSDpUgFITmGxcEbtSrWqH9rrE8RNSoHMUsGcMD4lUCTSCKiakJzEkVJdhVizJNOldzARjipVWzHtJALKJ9nVhTYfaIzMakAhIRlLuBXKXYNSpbSDcPqyppWZdgAls12AdNfNqwnTQUEOJWQmWE2zZs1Sa2DvRq0Y1PcXD4ZYKh6tY7LPLUHJ2ZdSOhhdE3IWeYTa2Uc3fmbQ9g8YpXsuTqK/emtREsqkuy4GUyMqSpBBL3f2WpZj2md2ryi1TxibKllCFBCVXWlA9ZUPclgTV6aUhRC2Idswqzs9TSj8vCFcXj0gj3So5Wappq9EhxrsYkoyfgpGdF7I4zMyjsuEsp+SSGTcuaBy79IrTi1JzK59oBrdWuxhVOLAzBlUDElwaaMKNevM84L+sCgSoGWDR6ali5sTGyY5PuPHLXYydMKqgqqaEAsS4vSp05ViKgpRbKolVw1Gq7m9+l4lNmBSeyUsk5CyQ7lVGa4PI3BfaG8HMQhTFXaUCNySGe3JiYXHiW1A2djnD8SqUgSUIA7WZRCWJNq1sAGgkzicw9kJ7JLVJIPgA1oj60XfKGcqqSxGwqRS0NcMMtNaqWTcmqgXLiOvHCSVWCU77iE/CLSgl8ubcAtawKh+ea0rArSo55gIJAFASKsx7zryi+xs9DZZjhLUAdztT6k6RzcnHyUqOUhQ21LWfmCQxhp44pdyO/sLijMDMjs9lgWYsKGzJ7xStNIUx2PUoBCV5FporMOyHAe4ZqG790FwWLftVYEiu71bWJzZSXJSqpPa3Znvci47tom3SEcgEmQolypKVJFSAajQgWN9TpEUYdZJdQUkgCpDmrn5Ad4tGTMQx9l0A1GpvR9BaGlYmUyigKQT7aVO6av2VeyRbY/Rkn3QmwvhsOtIOUIABLAaJ3c9DUbwXFlAd3pr87eJMEwiwugLULCpdrgUoSDbYiNzuHK9YahVc6XFgVEhn1Y6WYQsOXRrAUKHzOLk/evQxohhVNGazi/PxvrBlYNMvPlPaDO9XuDagJAp/MbkLC3SVOAz0bk552MNJUahIoGcijKsagWr4voPpBFYNSQcqCRqwdtdbB+UNKldlQdzUIJDgmwsz9I1OlyVkD2FpBLOcqiwG93HzhrVchoSlSlJINr0IAbQ/4iww0vMylKZQoD1vSz38oBLwhCdDVuYo9zXX57QyoD3TclxQ1/y574jfN0agczCApJNSSLGh5dK6wCYQzEHRgbWhkoarFwauADUE1/OcZipSVKAS5J3Oort9dozqwFeqZW9bW5F7eFIkZwS4YC7dNPlD4w2UAc7gdzPqWbxhIBJNq0OxOnjQRNr0AIpY1NecZGvV/7Sebn7xkNyChWZgUMSFs4WAAk6pYagO6gXhGYgvUHMS6iogpdwKAAGzDlGRkdj7FDWUJpVZJfQJfUV3fpDGBwEyamaopAZOdQzOMjhI8CRQRqMifkxLBYR1dplF7kqFaV7Pasd4JxvDyJcvNKTlU7ukkB2Jq9fCNxkVj/AAhKmViGLAHS5OUihqNmIoN4dPECslSaMghiAzsLNYVeMjIDSapmFsNivWLZgyjup1GzJcdkl70tWGpXFQCE5pSUs4eWpTgA5h4jXfwyMiTjbZrJTPVzD6xLEEguQWJLFgHpSrWr4OSMCVMyilJcaOadolwauCW/zGRkB8JFI8g5nDRKNuwp0lFiQS93LVY9Q8WUqUqSlaFWYZWLPZtaUFuVYyMhccnKCbClyKYXF5ipYdIs2pd9egPStYf4diO1mUwUwSGd+bmvLwjIyC5NSpE27Zo4vMqpNGLE1cVbaKqRh3cJ7FSkpV2kl2IJ+zCMjIE3SbAakqA7CTnDapFVXNGZqHXaJYbHpOUhNahwBWh+gPhGRkGDtCMjLmFTXDkCm9CA7vtDkrABbIBUwSF01fq2m+gbnGRkB8JgQTCDK6QSQ2bYuM1zvRW75RakA4wJa0ImBcwKlqIzp2cB8pIo5y78mjIyMu9jEMIEzEKClEqQQklq1rs3L71hufYpAAYEgMwISATblGRkPkXKZmDIeWZXxFJfQUfevsnaFEryABajV0pUBuwtomnWNRkaRh7CpUllB8jgMS5q432hlWNNSgBLs41azPV/K0ZGQNVyYFLxPaytQ3ZgHvXd3HjG1SwEmaScoJA3cpzDxAJPWNRkSStgEjNUQ5VQOTftUc02EOHEFACncOUqpctmd70jIyCuxivVxRZLkl9dK66xqMjINGP/2Q=='
    },
    {
      name: 'Granite Hill',
      image: 'data:image/jpeg;base64,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'
    },
    {
      name: 'Mountain top',
      image: 'data:image/jpeg;base64,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'
    }
  ];

  res.render('campgrounds', { campgrounds});
});

app.post('/campgrounds', (req, res) => {

});


app.listen(3000, () => {
  console.log(`Blend server up and running!`);
});
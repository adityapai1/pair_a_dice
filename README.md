# 🎲 Pair-a-Dice

Pair-a-Dice is a secure passphrase generator based on the concept of diceware. 
It generates easy-to-remember yet highly secure passphrases by simulating virtual dice rolls.

<img width="1419" alt="WEB UI " src="https://github.com/user-attachments/assets/c4e08a66-b342-4bde-80bb-2031157f2b5c">



## ⚙ How It Works

1. Virtual dice are rolled 5 times to generate a 5-digit number.
2. This number is used against a lookup table of words.
3. The process is repeated 4 times to create a 4-word passphrase.
4. The result is a passphrase that's easy for humans to remember but difficult for machines to crack.

## 🛠️ Tech Stack

- **Frontend**: React with Tailwind CSS
- **Backend**: WSGI server
- **Database**: MongoDB

## 🔒 Important Feature

Pair-a-Dice uses Python's `secrets` library to generate random numbers that are cryptographically strong, ensuring a high level of entropy and security for your passphrases.


---

## 📚 Reference 

https://youtu.be/Pe_3cFuSw1E?si=6f7Yj7BhBOLM73P1

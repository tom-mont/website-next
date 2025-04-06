---
title: "Written in Rust"
excerpt: "What's all the hype about?"
coverImage: "/assets/blog/flink-starter/squirrles.jpg"
date: "2025-04-05T05:35:07.322Z"
author:
  name: Tom Montgomery
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/wireshark/cover.jpg"
tags: ["Learnings"]
---

A common theme of my experience in tech over the last few months has been:

(1.) Hear about a new library or tool that is really, really fast

(2.) Find out that it is _written in Rust_ (italics my own)

I thought the best way to understand what and why would be to write some code in the damn thing.

I started off using the [Rust book](https://doc.rust-lang.org/book/). This is a fantastic resource and made learning (or at least, starting to learn) the language simple and enjoyable.

Being the impatient and practical man I am, I soon panged to build something that is _written in Rust_. The website claimed Rust is good for writing command line tools. In addition to being impatient and practical I am also self-absorbed and so this was a great opportunity also to name a command line tool after myself.

## The brief

When I am on my laptop I spend a lot of time in the command line. This does not prevent my brain from thinking of things outside of the task at hand. Some of these things may also actually be half-useful to remember. I wanted a command line tool that would help me remember ideas without needing to leave the development context. Enter `tomm_cli`.

## How it works

You can find the repository [here](https://github.com/tom-mont/tomm_cli). Running the command `tomm_cli` with the flag `--remember` will write whatever text you input to a file in Obsidian. For me, this means I can forget about it - all I need to remember is to check the Obsidian file regularly.

```bash
tomm_cli --remember "take out the bins tomorrow morning"
```

![](/assets/blog/tomm_cli/obsidian_screenshot.png)

## some rusty Rust

This project was a great opporunity to get to grip with some Rust fundamentals. [Structs](https://doc.rust-lang.org/book/ch05-01-defining-structs.html) serve as objects, allowing you to define different attributes that can be differen types. `tomm_cli` has (for now) only one struct:

```rust
pub struct Args {
// thing to remember
    #[arg(short, long)]
    pub remember: String,
}
```

which houses one value - `remember`. This value is used in `run` function of the CLI app. The `run` function writes the text from the `--remember` flag to an Obsidian file. In order to do this we make use of the `OpenOptions` function from the standard filesystem crate. This function is called in an intuitive, readable manner:

```rust
    OpenOptions::new()
        .create(true)
        .append(true)
        .open(file_path)?
        .write_all(data.as_bytes())?;
```

where `OpenOptions` will create a file if it does not exist at the `file_path` (the location of the `working-memory.md` file). If the file does exist, the text will only be appended to the existing file. The data is written `as_bytes`.

**Quick sidenote on the `?` operator:** This is used to [propogate errors up to the calling code](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html#a-shortcut-for-propagating-errors-the--operator). This operator is used with functions where a result type is returned. If an error is returned by the inline function appended with the `?` operator, this error will also be returned by the calling function.

## Getting to actually use the thing

At this point I found a pretty cool command. `cargo install --path .` will build the app and place the binary file in `/home/username/.cargo/bin`. If this is in your `$PATH` than simply running the command in your CLI will work! Epic.

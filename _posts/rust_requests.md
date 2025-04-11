---
title: "Requests in Rust"
excerpt: "Finding my feet in Rust by getting to familiar ground" 
coverImage: "/assets/blog/rust_requests/rust-requests-cover.jpg"
date: "2025-04-10T05:35:07.322Z"
author:
  name: Tom Montgomery
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/wireshark/cover.jpg"
tags: ["Learnings"]
---

I have been learning a bit about [Rust](https://www.tom-montgomery.com/posts/tomm_cli) recently - it has exposed me to some new concepts that, when writing in Python, you simply don't think about. I don't necessarily think it is a bad thing that one would have these considerations otherwise - there is a reason Python is so popular and a great entry point into writing code.

That being said, I have been interested in broadening my understanding of development. Almost immediately Rust forces you to start thinking about 'memory' and 'ownership'. Before, in Python, just writing the code is sufficient for it t run (notwithstanding the obligatory bug or seven). Now that I am writing code in Rust I am having to think about what type an object (or struct, rather) is and what that object is actually able to do. It's all been a bit new and a bit scary - I thought I would bring things a little closer to home by trying to build out a real-time data stream using Rust.

The code to which I refer in this post can be found [on my Github page](https://github.com/tom-mont/rust_requests).

## A lot of code for not a lot of output

The first thing that will strike you when perusing the repo above is that it is far more verbose than Python code of a similar functionality. There are a couple of reasons for that:

(1.) I wanted to do it the "right(ish)" way. I tried to decouple logic wherever possible, to a somewhat non-sensical degree perhaps
(2.) I may be off here, but I do think Rust is generally more verbose than Python. I will go into this in some more detail and will leave it as a blanket statement here
(3.) I intentionally made it more verbose as a forcing function to try adhere to Rust- (or, rather, type-) friendly coding principals.

## A focus on what is being returned

Perhaps a good example of some of the considerations (and, consequently, verbosity) that arise when moving from Python to Rust is the function to fetch events. This is what it looks like in Rust:

```rust
async fn fetch_events(
        &self,
    ) -> std::result::Result<
        impl futures_util::Stream<Item = std::result::Result<Event, String>>,
        AppError,
    > {
        let response = self
            .client
            .get(&self.config.api_url)
            .send()
            .await?
            .bytes_stream()
            .eventsource()
            .map(|result| result.map_err(|e| e.to_string()));

        Ok(response)
    }
```

compared to the Python code of the same function:

```python
    with (
        app.get_producer() as producer,
        EventSource(
            "http://github-firehose.libraries.io/events", timeout=30
        ) as event_source,

```

(okay, okay, I am cheating a little. That `app.getproducer()` in the Python function is from the Quixstreams library but just... for the sake of argument...)

We can see, firstly, we need to specify what is being _returned_ by the Rust function (a `Result` that will either be a `Stream` item or an error).

Secondly, we need to be explicit about the fact that the function is asynchronous. This is manifest in the telltale signs of asynchronous functions, namely the `async` prepending the whole function as well as the use of an `await`.

Thirdly, we need to explicitly handle the error: (`.map(|result| result.map_err(|e| e.to_string()));`).

Now, this may seem and certainly does, initially, _feel_ like a bit of a pain. I think that is a pretty good case-in-point about why Python is such a great language for non-programmers (analysts, scientists etc.) - it abstracts **a lot** of complexity and allows you to focus just on the logic. (I am aware I come across here as incredibly snobby,  making Python sound like a low-code tool. My apologies - for the record I am by no means out of the Python-user camp and the language for its usefulness.)

However, if one (i.e. me) wants to better understand the code that is being written (with the view to, hopefully, improving the construction and performance of the code), these are very important considerations to have. Memory impacts performance to an, essentially, exhaustive degree - it is probably worth my while to understand it a little better.

## Pretty printing

I always prefer my JSON to be pretty-printed (don't we all). It turns out this is yet another little bit of complexity-outsourcing that Python kindly does on my behalf. With a simple `pformat`, my naive self is able to make JSON look 'pretty' when printing in the command line. When looking to find a similar function in Rust I was forced to confront the fact that it is not quite so simple.

This is another case of a bit of worthwhile pain for the developer. In order to eventually print something legible in the console we actually need to define an object (or a `struct` in Rust lingo) with the fields we would like the struct to posses.

That is, the events from the Github firehose are not simple a big string that Python will magically indent for me - I need to explicitly tell Rust what fields are in this object/struct so that it knows what to print (prettily). There was actually some clever stuff going on behind the scenes of that identation in the `pformat` and now I need to pull my weight a bit.

We thus end up with the following struct:

```rust
// Type-safe github event model
#[derive(Debug, Deserialize, Serialize)]
struct GithubEvent {
    id: String,
    #[serde(rename = "type")]
    event_type: String,
    actor: Actor,
}

#[derive(Debug, Deserialize, Serialize)]
struct Actor {
    display_login: String,
    // add other fields as needed
}

```

The `serde` package is used to **ser**ialise and **de**seriailise JSON. This is required so that I can define the struct's fields. We also have a nested struct here (naturally due to the fact that there was a nested JSON in our Github event).

Eventually we can write out our own pretty print function:

```rust
// Display implementation for pretty printing
impl fmt::Display for GithubEvent {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "id: {}\ntype: {}\ndisplay loging: {}",
            self.id, self.event_type, self.actor.display_login
        )
    }
}
```

which, once again, has forced us to think about something new. The syntax above (`impl`) defines a method for a struct. Basicaly, something the struct can "do" (`Display`, in this case. But maybe I should rename it to pretty print.) The reference to `&self` means that the struct will be using its own fields (let's not get started on the ampersand just yet) in the method. The fields we know and love from above (`id`, `event_type`, `actor.display_login`) belonging to the `GithubEvent` in reference are accessed and printed. Whew, `pformat` anyone?

![](/assets/blog/rust_requests/pretty-print.png)

(it did work though!)

## Next steps

The examples above are a small window into some unfamiliar concepts that have arisen in my Rust journey. As mentioned before, there are a **lot** of new concepts to come to grips with. We do know, though, that the only way to learn them is by breaking some stuff and trying to put it back together. Don't hold me to it but I smell a bit of Rust/Kakfa synergy brewing...

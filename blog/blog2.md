---
layout: blog
type: blog
title: Visual Studio C# UI Redesign
permalink: blog/mvvm
year: 2019
date: 2019-02-01
---

So one of the things I had to do was redesign the whole ui for the code compare software- this is before I can work on more of the algorithm/backend/database stuff. This included creating mockups of all the pages in Figma (a mockup design tool), and creating a new logo in Illustrator. I’d love to share these designs with you, but i’m not allowed!

But, I’ll share with you two very useful things I learned when implementing the front end code in visual studio.


1. **STYLING**

On Figma, it just takes a click of a button to change the size, the font, the beveling, and any other property of an item. IT's not that easy to get exactly what you want in XAML.

There are a couple of ways to style in XAML. The simplest way is to style directly in the item tag, like so:

```
<TextBlock Grid.Row="3" Text="Name" Margin="40,18,0,0" FontFamily="Microsoft MHei" FontSize="11" />
```

However, this isn't the most effiecent method of styling, especialy if you have a lot of items that require similar stylings.
Instead, opt for using the window's resources, and creating a style that can be used within the XAML.
Here's an example:

```
<Window.Resources>
        <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                <ResourceDictionary Source="../ResourceDictionary.xaml"/>
            </ResourceDictionary.MergedDictionaries>

            <!-- TextBlock -->
            <Style TargetType="{x:Type TextBlock}" >
                <Setter Property="FontSize" Value="13"/>
                <Setter Property="FontFamily" Value="Yu gothic UI Semilight"/>
                <Setter Property="Foreground" Value="#444444"/>
                <Setter Property="HorizontalAlignment" Value="Left" />
                <Setter Property="TextWrapping" Value="Wrap"/>
            </Style>
   </Window.Resources>
```

The TargetType parameter shows that it targets all TExtBlocks, but don't worry, you can override these properties within the tag if you wish.
You can also create custom styles that you can refer to by key. Here's an example.

```
<Style x:Key="GreyButton" TargetType="Button">
        <Setter Property="Background" Value="#909090"/>
        <Setter Property="BorderThickness" Value="0"/>
        <Setter Property="OverridesDefaultStyle" Value="True"/>
        <Setter Property="FontFamily" Value="Bahnschrift Light"/>
        <Setter Property="FontSize" Value="12"/>
        <Setter Property="Foreground" Value="White"/>
        <Setter Property="Cursor" Value="Hand"/>
        <Setter Property="Template">
            <Setter.Value>
                <ControlTemplate TargetType="{x:Type Button}">
                    <Border CornerRadius="2" Background="{TemplateBinding Background}">
                        <Grid>
                            <ContentPresenter x:Name="MyContentPresenter" Content="{TemplateBinding Content}" HorizontalAlignment="Center" VerticalAlignment="Center" Margin="0,0,0,0" />
                        </Grid>
                    </Border>
                    <ControlTemplate.Triggers>
                        <Trigger Property="IsMouseOver" Value="True">
                            <Setter Property="Background" Value="#707070"></Setter>
                        </Trigger>
                    </ControlTemplate.Triggers>
                </ControlTemplate>
            </Setter.Value>
        </Setter>
    </Style>
```

The x:Key is the key which can be used to style an item. To utilize this just call:
```
Style="{StaticResource GreyButton}"
```

You can also use resource dictionaries, a completely new file to store your objects and your styles which you can refer to multiple of times.


2. **RESOURCE DICTIONARIES**

Resources are objects that you create that are used more than once, so that you can refer to the resource dictionary rather than creating the object every time. Basically, resources promote object reuse throughout your application. It keeps your code more efficient, and makes changes to these objects much easier- just change the resource in the resource dictionary!

Add a new resource dictionary (WPF) to your project, and just add your resource. For example, I had a blue custom button that I used for almost every page,

```
<!-- Blue Button-->
    <Style x:Key="BlueButton" TargetType="Button">
        <Setter Property="Background" Value="#266197"/>
        <Setter Property="BorderThickness" Value="0"/>
        <Setter Property="OverridesDefaultStyle" Value="True"/>
        <Setter Property="FontFamily" Value="Bahnschrift Light"/>
        <Setter Property="FontSize" Value="14"/>
        <Setter Property="Foreground" Value="White"/>
        <Setter Property="Cursor" Value="Hand"/>
        <Setter Property="Template">
            <Setter.Value>
                <ControlTemplate TargetType="{x:Type Button}">
                    <Border CornerRadius="3" Background="{TemplateBinding Background}">
                        <Grid>
                            <ContentPresenter x:Name="MyContentPresenter" Content="{TemplateBinding Content}" HorizontalAlignment="Center" VerticalAlignment="Center" Margin="0,0,0,0" />
                        </Grid>
                    </Border>
                    <ControlTemplate.Triggers>
                        <Trigger Property="IsMouseOver" Value="True">
                            <Setter Property="Background" Value="#1A4D7D"></Setter>
                        </Trigger>
                    </ControlTemplate.Triggers>
                </ControlTemplate>
            </Setter.Value>
        </Setter>
    </Style>
```

Then, in the XAML of your view, add reference to your resource dictionary using this code snippet:

```
<Window.Resources>
        <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                <ResourceDictionary Source="../ResourceDictionary.xaml"/>
            </ResourceDictionary.MergedDictionaries>
        </ResourceDictionary>
    </Window.Resources>
```

Finally, to apply the blue button style to my button, I added this parameter to my button item
```
Style="{DynamicResource BlueButton}"
```

And it's that simple! Now you can design the front-end of your application with much more ease and efficiency!